const jwt = require('jsonwebtoken')
const path = require('path');
const mongoose = require('mongoose')

require('dotenv').config();

const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./graphql')

const { SubscriptionServer } = require('subscriptions-transport-ws')
const http = require('http')

const express = require('express')
const cors = require('cors')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const loggedUser = jwt.verify(auth.substring(7), process.env.TOKEN_KEY)
            return { loggedUser };
        }

    },
})

const app = express()

const kaynnista = async () => {
    const PORTTI = process.env.PORT || 4000
    
    await server.start()
    
    app.use(express.static('../rageputt/build'))
    app.use(cors())

    app.get('*', function (req, res) {
        if (!req.path.startsWith('/graphql'))
            res.sendFile(path.resolve(__dirname, '../rageputt/build/index.html'));
    });

    server.applyMiddleware({ app })

    const httpServer = http.createServer(app)
    server.installSubscriptionHandlers(httpServer)

    await new Promise(resolve => httpServer.listen( PORTTI, resolve))
    console.log(`Serveri portissa ${PORTTI}/${server.graphqlPath}`)
    console.log(`Subscriptionit ${server.subscriptionsPath}`)
}

const mongoUri = process.env.MONGO_DB
console.log(`Yhdistetään Mongon Databaseen... (${mongoUri})`)
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(res => {
    console.log('Yhdistetty MongoDB! :)')
}).catch(e => {
    console.log(`Virhe yhdistettäessä mongoon :( (${e.message})`)
})

module.exports = { server, kaynnista };