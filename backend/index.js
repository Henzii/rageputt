const { ApolloServer } = require('apollo-server')
const { typeDefs, resolvers } = require('./resolvers')

require('dotenv').config();

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then( ({ url }) => {
    console.log(`Server @ ${url}`)
})