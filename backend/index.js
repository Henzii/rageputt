const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./resolvers')

const express = require('express')
const cors = require('cors')


require('dotenv').config();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const loggedUser = jwt.verify(auth.substring(7), process.env.TOKEN_KEY)
            return { loggedUser };
        }

    }
})

const app = express()

const kaynnista = async () => {
    await server.start()
    app.use('/', express.static('../rageputt/build'))
    app.use(cors())
    server.applyMiddleware({ app })
    await new Promise(resolve => app.listen({ port: process.env.PORT || 4000 }, resolve))
    console.log(`Serveri portissa ${process.env.PORT || 4000}${server.graphqlPath}`)

  
}

kaynnista()




const mongoUri = process.env.MONGO_DB
console.log(`Yhdistetään Mongon Databaseen... (${mongoUri})`)
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(res => {
    console.log('Yhdistetty MongoDB! :)')
}).catch(e => {
    console.log(`Virhe yhdistettäessä mongoon :( (${e.message})`)
})

