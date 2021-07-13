
const App = require('../App')
const mongoose = require('mongoose')
const { initDatabase, testUser1, testUser2, testGame } = require('./helpers')

describe('Pelin poistamisen testit', () => {
    beforeAll( async () => {
        await initDatabase();
    })
    test('Lähtötilanne ok', async () => {
    })
    afterAll( () => {
        mongoose.connection.close()
    })
})