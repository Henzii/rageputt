const { gql, UserInputError, SyntaxError, ForbiddenError, ValidationError, AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const UserModel = require('./models/User')
const GameModel = require('./models/Game')

const typeDefs = gql`
    type User {
        user: String!
        name: String
        email: String
        friendRequests: [String]
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
        getGames: [String]
    }
    type Mutation {
        login( user: String!, password: String!):Token
        createUser( user: String!, password: String!, name: String, email: String):User
        setScore( roundId: String!, round: ID!, player: String!, score: Int!): Game
        finishGame( roundId: String! ):Game
        createGame: String
        sendFriendRequest( fName: String!): String
        handleFriendRequest( friendId: String!, action: Boolean!): String
    }
`

const resolvers = {
    Query: {
        getMe: async (root, args, context) => {
            if (!context.loggedUser) throw new AuthenticationError('Kirjaudu sisään')
            const user = await UserModel.findById(context.loggedUser.id).populate('friends', { user: 1, name: 1, id: 1 })
            console.log('Getme: ', user)
            return {
                user: user.user,
                name: user.name,
                email: user.email,
                friendRequests: user.friendRequests,
                friends: user.friends
            }
        },
        getGames: async (root, args, context) => {
            if (!context.loggedUser) {
                throw new AuthenticationError('Kirjaudu sisään.')
            }
            const user = await UserModel.findById(context.loggedUser.id)
            console.log('Getfames: ', user.games)
            return user.games;
        },
        usersCount: () => users.length,
        users: async () => UserModel.find({}).populate('friends', { user: 1 }),
        getRound: async (root, args) => {
            console.log('Hae peli', args.roundId)
            if (args.rounId === null || args.roundId === '') return null
            const rundi = await GameModel.findById(args.roundId).populate('players.user')
            if (!rundi) {
                throw new ForbiddenError('Epäkelpo ID')
            }
            return rundi;
        }
    },
    Mutation: {
        createGame: async (root, args, context) => {
            console.log('Uusi peli')
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
            user.games = user.games.concat(newGame.id)
            user.save();
            return newGame.id

        },
        finishGame: (root, args) => {
            const peli = testRound.find(r => r.id === args.roundId)
            peli.finished = true;
            return peli
        },
        setScore: async (root, args) => {

            const peli = await GameModel.findById(args.roundId).populate('players.user')

            if (!peli) throw new SyntaxError('Epäkelpo ID')
            if (peli.finished) throw new ForbiddenError('Päättynyttä peliä ei voi enää muokata')

            const pelaaja = peli.players.find(p => p.user.user === args.player)
            if (!pelaaja) throw new SyntaxError('Pelaajaa ei löydy')

            pelaaja.tulokset.set(args.round, args.score)

            await peli.save()

            console.log(peli.players)

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
                console.log(e.error)
                throw new ValidationError(`Virhe käyttäjän luomisessa`)
            }

            return newUser;
        },
        sendFriendRequest: async (root, args, context) => {
            if (!context.loggedUser?.user) {
                throw new AuthenticationError('Kirjaudu sisään!')
            }
            const myId = context.loggedUser.id
            const kaveri = await UserModel.findOne( { user: args.fName })

            if (!kaveri) {
                throw new UserInputError('Kaveria ei löydy')
            }
            if (kaveri.id == myId ) {
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