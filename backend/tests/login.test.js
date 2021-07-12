
const App = require('../App');
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

let newId = '';
let token = '';

describe('Kirjautumisen testit', () => {
    beforeAll(async () => {
        // Poistetaan kaikki käyttäjät
        await User.deleteMany({})
    })
    test('Luodaan uusi käyttäjä', async () => {
        const result = await App.server.executeOperation({
            query: `
                mutation createUser($user: String!, $password: String!) {
                    createUser(user: $user, password: $password) { id }
                }
            `,
            variables: { user: 'Testaaja', password: 'salasana' }
        })
        newId = result.data.createUser.id;
        expect(result.data.createUser.id).toBeDefined()
    })
    test('Kirjaudutaan sisään / saadaan token', async () => {
        const result = await App.server.executeOperation( {
            query: `mutation login($user: String!, $password: String!) {
                login(user: $user password: $password ) { value }
            }`,
            variables: { user: 'Testaaja', password: 'salasana'}
        })
        token = result.data.login.value;
        expect(result.data.login.value).toBeDefined();
    })
    test('Tokenista saadaan oikea ID', () => {
        const tokenUser = jwt.verify(token, process.env.TOKEN_KEY) 
        expect(newId).toBe( tokenUser.id )
    })
    test('Väärä salasana aiheuttaa errorin', async () => {
        const result = await App.server.executeOperation({
            query: `
                mutation login($user: String!, $password: String!) {
                    login( user: $user password: $password) { value }
                }
            `,
            variables: { user: 'John', password: "Shit" }
        })
        expect(result.errors).toBeDefined();
    })
    afterAll(() => {
        mongoose.connection.close()
    })
})