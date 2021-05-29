const { gql, UserInputError } = require('apollo-server');
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
                0,1,2,5,4,3,5,6,4,3,2,4,5,4,3,2,4,5,6,1
            ]
        },
        {
            user: {
                name: 'Uolevi',
                id: 'BB2'
            },
            tulokset: [
                1,2,4,3,0,2,3,0,2,1,2,0,3,5,4,2,3,2,0,1
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
    }
`

const resolvers = {
    Query: {
        usersCount: () => users.length,
        users: () => users,
        getRound: (root, args) => {
            const rundi = testRound.find(r => r.id === args.roundId)
            return rundi;
        }
    },
    Mutation: {
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