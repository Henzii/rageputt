
const App = require('../App')
const mongoose = require('mongoose')
const { initDatabase, testUser1, testUser2, testGame } = require('./helpers')
const jwt = require('jsonwebtoken')
const { gql } = require('apollo-server')
const User = require('../models/User')
const Game = require('../models/Game')
const bcrypt = require('bcrypt')
let token = ''

const restoreQuery = gql`
    mutation restoreAccount($email: String!) {
        restoreACcount(email: $email)
    }
`

describe('Tunnuksen palauttamisen testit', () => {
    beforeAll(async () => {
        await initDatabase();
    })
    test('Tuntemattoman ja tunnetun sähköpostin vastaus sama', async () => {
        /*
            Palvelin palauttaa saman vastauksen riippumatta siitä löytyykö
            sähköpostiosoitetta palvelimelta
        */
        const result1 = await App.server.executeOperation({
            query: restoreQuery,
            variables: { email: testUser2.email }
        })
        const result2 = await App.server.executeOperation({
            query: restoreQuery,
            variables: { email: 'somewhit@idunno.com'}
        })
        expect(result1).toMatchObject(result2)
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
        await testUser1.save()
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
        expect(alteredUser.tempPassowordHash).toBeUndefined()   // Temppi passu poistunut
    })
    afterAll(() => {
        mongoose.connection.close()
    })
})