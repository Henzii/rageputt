const { gql, UserInputError, SyntaxError, ForbiddenError, 
    ValidationError, AuthenticationError, PubSub, withFilter} = require('apollo-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const UserModel = require('./models/User')
const GameModel = require('./models/Game')

const pubsub = new PubSub()

const typeDefs = gql`
    type User {
        user: String!
        name: String
        email: String
        friendRequests: [User]
        friends: [User]
        id: ID
    }
    type GameCard {
        user: User!
        tulokset: [Int]
    }
    type Game {
        finished: Boolean!
        timestamp: String
        players: [GameCard]
        id: ID!
    }
    type Token {
        value: String!
        user: User
    }
    type Query {
        getMe: User!
        usersCount: Int!
        users: [User]
        getRound( roundId: String! ): Game
        getGames: [Game]
    }
    type Mutation {
        login( user: String!, password: String!):Token
        createUser( user: String!, password: String!, name: String, email: String):User
        setScore( roundId: String!, round: ID!, player: String!, score: Int!): Game
        finishGame( roundId: String! ): String
        createGame( pelaajat: [String]): String
        sendFriendRequest( fName: String!): String
        handleFriendRequest( friendId: String!, action: Boolean!): String
        changeSettings( name: String, password: String, email: String ): User
        deleteGame( roundId: String! ): String
    }
    type Subscription {
        changedCard( roundId: String!): SubPushData
    }
    type SubPushData {
        roundId: String!
        data: GameCard!
        user: String
    }
`

const resolvers = {

    Subscription: {
        changedCard: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(['SCORE_SET']), 
                (payload, variables) => {
                    console.log('SUB! Payload: ', payload, 'Variables: ', variables)

                    return (payload.changedCard.roundId === variables.roundId)
                }
            )
        }
    },
    Query: {
        getMe: async (root, args, context) => {
            if (!context.loggedUser) throw new AuthenticationError('Kirjaudu sisään')
            const user = await UserModel.findById(context.loggedUser.id).populate('friends', { user: 1, name: 1, id: 1, email: 1 }).populate('friendRequests', { user: 1, name: 1, id: 1 })
            return {
                user: user.user,
                name: user.name,
                id: user.id,
                email: user.email,
                friendRequests: user.friendRequests,
                friends: user.friends
            }
        },
        getGames: async (root, args, context) => {
            if (!context.loggedUser) {
                throw new AuthenticationError('Kirjaudu sisään.')
            }
            const user = await UserModel.findById(context.loggedUser.id).populate(
                { 
                    path: 'games', 
                    populate: { 
                        path: 'players.user',
                        select: { user: 1, name: 1}
                    }
                })
            return user.games;
        },
        usersCount: () => users.length,
        users: async () => UserModel.find({}).populate('friends', { user: 1 }).populate('friendRequests', { user: 1, name: 1, id: 1 }),
        getRound: async (root, args) => {
            if (args.rounId === null || args.roundId === '') return null
            const rundi = await GameModel.findById(args.roundId).populate('players.user')
            if (!rundi) {
                throw new ForbiddenError('Epäkelpo ID')
            }
            return rundi;
        }
    },
    Mutation: {
        changeSettings: async( root, args, context) => {
            if (!context.loggedUser) throw new AuthenticationError('Kirjaudu sisään')
            const user = await UserModel.findById(context.loggedUser.id)
            
            // Palauta uusi, päivitetty käyttäjä
            return user;
        },
        deleteGame: async( root, args, context) => {
            if (!context.loggedUser) throw new AuthenticationError('Kirjaudu sisään')

            return "Have a nice day"
        },
        createGame: async (root, args, context) => {
            console.log('Uusi peli. Pelaajat: ', args.pelaajat)

            if (!context.loggedUser.user) {
                throw new AuthenticationError('Kirjaudu sisään!')
            }
            const user = await UserModel.findById(context.loggedUser.id)
            const newGame = new GameModel({
                finished: false,
                timestamp: Date(),
                players: [
                    {
                        user: user.id,
                        tulokset: []
                    }
                ]
            })
            await newGame.save()

            for (let i = 0; i < args.pelaajat.length; i++) {
                const pp = await UserModel.findById(args.pelaajat[i])
                newGame.players.push({ user: pp.id, tulokset: [] })
                pp.games = pp.games.concat(newGame.id)
                pp.save()
            }
            await newGame.save()
            user.games = user.games.concat(newGame.id)
            user.save();
            return newGame.id

        },
        finishGame: async (root, args) => {
            console.log('Päätetään peli ' + args.roundId)
            const peli = await GameModel.findById(args.roundId)
            if (!peli) throw new SyntaxError('Epäkelpo ID')
            peli.finished = true;
            await peli.save()
            return "OK"
        },
        setScore: async (root, args) => {

            const peli = await GameModel.findById(args.roundId).populate('players.user')

            if (!peli) throw new SyntaxError('Epäkelpo ID')
            if (peli.finished) throw new ForbiddenError('Päättynyttä peliä ei voi enää muokata')

            const pelaaja = peli.players.find(p => p.user.user === args.player)
            if (!pelaaja) throw new SyntaxError('Pelaajaa ei löydy')

            pelaaja.tulokset.set(args.round, args.score)

            await peli.save()

            pubsub.publish( "SCORE_SET", { changedCard: { data: pelaaja, roundId: peli.id }})

            return peli

        },
        login: async (root, args) => {
            const user = await UserModel.findOne({ user: args.user })

            if (!user || await bcrypt.compare(args.password, user.passwordHash) === false) {
                throw new UserInputError("Väärä tunnus tai salasana")
            }
            else {
                const forToken = {
                    user: user.user,
                    id: user.id
                }
                const token = jwt.sign(forToken, process.env.TOKEN_KEY)
                return { value: token, user: { user: user.user, name: user.name } }
            }
        },
        createUser: async (root, args) => {
            const newUser = new UserModel({
                user: args.user,
                name: args.name,
                email: args.email,
                passwordHash: await bcrypt.hash(args.password, 10)
            })

            if (args.name === '') newUser.name = args.user

            try {
                await newUser.save();
            } catch (e) {
                console.log(e.errors.type)
                if (e.errors.user.kind === 'unique')
                    throw new ValidationError('Käyttäjä on jo olemassa')
                else if (e.errors.user.kind === 'minlength')
                    throw new ValidationError(`Käyttäjätunnus on liian lyhyt`)
                else
                    throw new ValidationError('Käyttäjätunnusta ei voitu luoda')
            }

            return newUser;
        },
        sendFriendRequest: async (root, args, context) => {
            if (!context.loggedUser?.user) {
                throw new AuthenticationError('Kirjaudu sisään!')
            }
            const myId = context.loggedUser.id

            const kaveri = await UserModel.findOne({ user: args.fName })

            if (!kaveri) {
                throw new UserInputError(`Henkilöä ${args.fName} ei löydy`)
            }
            if (kaveri.friends.includes(myId)) {
                throw new UserInputError('Olette jo kavereita')
            }
            if (kaveri.id == myId) {
                throw new UserInputError("Oikeesti?")
            }
            if (kaveri.friendRequests.includes(myId)) {
                throw new UserInputError('Kaveripyyntö on jo lisätty')
            }
            kaveri.friendRequests.push(myId)
            kaveri.save()
            return "OK"
        },
        handleFriendRequest: async (root, args, context) => {
            if (!context.loggedUser?.user) {
                throw new AuthenticationError('Kirjaudu sisään!')
            }
            const myId = context.loggedUser.id
            const friendId = args.friendId
            const user = await UserModel.findById(myId)

            if (!user.friendRequests.includes(friendId)) {
                throw new UserInputError('Kaveri ei ole lähettänyt pynntöä!?')
            }

            user.friendRequests = user.friendRequests.filter(u => u != friendId)
            if (args.action) {
                const frendi = await UserModel.findById(friendId)
                if (!frendi) {
                    throw new UserInputError('Kaveria ei ole olemassa')
                }
                if (!user.friends.includes(friendId))
                    user.friends.push(friendId)
                if (!frendi.friends.includes(myId))
                    frendi.friends.push(myId)
                try {
                    await frendi.save()
                } catch (e) {
                    throw new SyntaxError('Jokin meni vikaan: ' + e.message)
                }
            }
            await user.save()
            return "OK"
        }
    }
}

module.exports = { typeDefs, resolvers }