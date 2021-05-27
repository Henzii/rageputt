const { gql, UserInputError } = require('apollo-server');

const users = [
    {
        user: 'henzi',
        name: 'Henkka',
        passwordHash: 'jotain'
    }
]

const typeDefs = gql`
    type User {
        user: String!
        name: String
        email: String
        passwordHash: String!
    }
    type Token {
        value: String!
    }
    type Query {
        usersCount: Int!
        users: [User]
    }
    type Mutation {
        login( user: String!, password: String!):Token
        createUser( user: String!, password: String!, name: String, email: String):String
    }
`

const resolvers = {
    Query: {
        usersCount: () => users.length,
        users: () => users
    },
    Mutation: {
        login: (root, args) => {
            const user = users.find(u => u.user === args.user);
            if (!user) {
                throw new UserInputError("Väärä tunnus tai salasana")
            }
            return {
                value: 'SDKFSDGJKLEJGLKJSDCJCSMCMWLKEMFKLE'
            }
        },
        createUser: (root, args) => {
            return "OK"
        }
    }
}

module.exports = { typeDefs, resolvers }