const mongoose = require('mongoose')
const Game = require('../models/Game')
const User = require('../models/User')

const testUser1 = new User({
    user: 'tester1',
    name: 'Test User 1',
    email: 'henry.karlenius@gmail.com',
    passwordHash: 'Hash'
})
const testUser2 = new User({
    user: 'tester2',
    name: 'Test User 2',
    email: 'tester2@rageputt.com',
    passwordHash: 'Hash'
})
const testGame = new Game({
    finished: false,
    timestamp: new Date(),
    players: []

})
const initDatabase = async () => {

    await User.deleteMany({})
    await Game.deleteMany({})

    await testUser1.save()
    await testUser2.save()

    testGame.players = [
        { user: testUser1.id, tulokset: [] },
        { user: testUser2.id, tulokset: [] }
    ]
    await testGame.save();
    testUser1.games = testUser1.games.concat( testGame.id )
    testUser2.games = testUser2.games.concat( testGame.id )

    await testUser1.save()
    await testUser2.save()
}

module.exports = { initDatabase, testUser1, testUser2, testGame }