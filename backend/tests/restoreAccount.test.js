
const App = require('../App')
const mongoose = require('mongoose')
const { initDatabase, testUser1, testUser2, testGame } = require('./helpers')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Game = require('../models/Game')
const bcrypt = require('bcrypt')
let token = ''

describe('Tunnuksen palauttamisen testit', () => {
    beforeAll(async () => {
        await initDatabase();
    })
    test('Paluttaminen luo kertakäyttöisen salasanan', async () => {
        await App.server.executeOperation({
            query: `mutation restoreAccount($email: String!) {
                restoreAccount(email: $email)
            }`,
            variables: { email: testUser1.email }
        })
        const alteredUser = await User.findById(testUser1.id)
        expect(alteredUser.tempPasswordHash).toBeDefined()    // Temppi passu on asetettu.
    })
    test('Kirjautuminen kertakäyttöisellä salasanalla poistaa sen', async () => {
        testUser1.tempPasswordHash = await bcrypt.hash('temppiPassu', 10)
        const result = await App.server.executeOperation({
            query: `mutation login($user: String!, $password: String!) {
                login(user: $user, password: $password) { value }
            }`,
            variables: {
                user: testUser1.user,
                password: 'temppiPassu'
            }
        })
        expect(result.errors).toBeUndefined() // Ei erroreita
        expect(result.data.login.value).toBeDefined() // Saadaan tokeni
        const alteredUser = await User.findById(testUser1.id)
        expect(alteredUser.tempPassoword).toBeUndefined()   // Temppi passu poistunut
    })
    afterAll(() => {
        mongoose.connection.close()
    })
})