const Mutation = require('./mutations')
const Query = require('./queries')
const Subscription = require('./subscriptions')
const typeDefs = require('./typedefs')

const resolvers = {
    Query,
    Mutation,
    Subscription
}

module.exports = { resolvers, typeDefs }