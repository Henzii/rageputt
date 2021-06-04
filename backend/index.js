const { ApolloServer } = require('apollo-server')
const { typeDefs, resolvers } = require('./resolvers')
const mongoose = require('mongoose')

require('dotenv').config();

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const mongoUri = process.env.MONGO_DB
console.log(`Yhdistetään Mongon Databaseen... (${mongoUri})`)
mongoose.connect( mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(res => {
    console.log('Yhdistetty MongoDB! :)')
}).catch(e => {
    console.log(`Virhe yhdistettäessä mongoon :( (${e.message})`)
})
server.listen().then( ({ url }) => {
    console.log(`Server @ ${url}`)
})