const { gql, UserInputError, SyntaxError, ForbiddenError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const users = [
    {
        user: 'henzi',
        name: 'Henkka',
        passwordHash: 'jotain',
        id: 'A1'
    }
]
const testRound = [{
    finished: false,
    timeStamp: '1.1.2021 / 09:19',
    currentRound: 1,
    id: 'tR1',
    players: [
        {
            user: {
                name: 'Henkka',
                id: 'AA1'
            },
            tulokset: [
                
            ]
        },
        {
            user: {
                name: 'Uolevi',
                id: 'BB2'
            },
            tulokset: [
                
            ]
        }
    ]
}]

const typeDefs = gql`
    type User {
        user: String!
        name: String
        email: String
        id: ID!
    }
    type GameCard {
        user: User!
        tulokset: [Int!]
    }
    type Game {
        finished: Boolean!
        timeStamp: String!
        currentRound: Int!
        players: [GameCard]
        id: ID!
    }
    type Token {
        value: String!
    }
    type Query {
        usersCount: Int!
        users: [User]
        getRound( roundId: String! ): Game
    }
    type Mutation {
        login( user: String!, password: String!):Token
        createUser( user: String!, password: String!, name: String, email: String):User
        setScore( roundId: String!, round: ID!, player: String!, score: Int!): Game
        finishGame( roundId: String! ):Game
    }
`

const resolvers = {
    Query: {
        usersCount: () => users.length,
        users: () => users,
        getRound: (root, args) => {
            console.log('Getscore!')
            if (args.rounId === null || args.roundId === '') return null
            const rundi = testRound.find(r => r.id === args.roundId)
            return rundi;
        }
    },
    Mutation: {
        finishGame: (root, args) => {
            const peli = testRound.find(r => r.id === args.roundId)
            peli.finished = true;
            return peli
        },
        setScore: (root, args) => {
            const peli = testRound.find(r => r.id === args.roundId)
            if (!peli) throw new SyntaxError('Epäkelpo ID')
            if (peli.finished) throw new ForbiddenError('Päättynyttä peliä ei voi enää muokata')

            const pelaaja = peli.players.find(p => p.user.name === args.player)
            if (!pelaaja) throw new SyntaxError('Epäkelpo pelaaja')
            pelaaja.tulokset[ args.round ] = args.score;
            console.log('Setscore!')
            return peli;

        },
        login: async (root, args) => {
            const user = users.find(u => u.user === args.user);
            if (!user || await bcrypt.compare(args.password, user.passwordHash) === false) {
                throw new UserInputError("Väärä tunnus tai salasana")
            }
            else {
                const forToken = {
                    user: user.user,
                    id: user.id
                }
                const token = jwt.sign(forToken, process.env.TOKEN_KEY)
                return { value: token }
            }
        },
        createUser: async (root, args) => {
            const newUser = {
                user: args.user,
                name: args.name,
                email: args.email,
                id: 'ASB',
                passwordHash: await bcrypt.hash(args.password, 10)
            }
            users.push(newUser);
            return newUser;
        }
    }
}

module.exports = { typeDefs, resolvers }