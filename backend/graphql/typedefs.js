const { gql } = require('apollo-server')

const typeDefs = gql`
    type User {
        user: String!
        name: String
        email: String
        shareStats: Boolean
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
        isUsernameAvailable ( user: String!): Boolean
        getMe: User!
        usersCount: Int!
        users: [User]
        getRound( roundId: String! ): Game
        getGames( userId: ID ): [Game]
    }
    type Mutation {
        restoreAccount( email: String! ): String
        login( user: String!, password: String!):Token
        createUser( user: String!, password: String!, name: String, email: String):User
        setScore( roundId: String!, round: ID!, player: String!, score: Int!): Game
        finishGame( roundId: String! ): String
        createGame( pelaajat: [String]): String
        sendFriendRequest( fName: String!): String
        handleFriendRequest( friendId: String!, action: Boolean!): String
        changeSettings( name: String, password: String, email: String, shareStats: Boolean ): User
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
module.exports = typeDefs