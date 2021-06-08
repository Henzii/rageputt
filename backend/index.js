const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const { ApolloServer } = require('apollo-server')
const { typeDefs, resolvers } = require('./resolvers')



require('dotenv').config();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const loggedUser = jwt.verify( auth.substring(7), process.env.TOKEN_KEY)
            return { loggedUser };
        }

    }
})

const mongoUri = process.env.MONGO_DB
console.log(`Yhdistetään Mongon Databaseen... (${mongoUri})`)
mongoose.connect( mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(res => {
    console.log('Yhdistetty MongoDB! :)')
}).catch(e => {
    console.log(`Virhe yhdistettäessä mongoon :( (${e.message})`)
})

server.listen({ port: process.env.PORT || 4000 }).then( ({ url }) => {
    console.log(`Server @ ${url}`)
})