const { Mutation, Subscription } = require('./mutations')
const Query = require('./queries')
const typeDefs = require('./typedefs')

const resolvers = {
    Query,
    Mutation,
    Subscription,
}

module.exports = { resolvers, typeDefs }