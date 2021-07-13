
const App = require('../App')
const User = require('../models/User')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

let token = ''

describe('Asetukset-sivun testit', () => {
    beforeAll(async () => {
        await User.deleteMany({})
        const newUser = new User( {
            user: 'Tester',
            name: 'Mr. Tester',
            email: 'tester@jippii.fi',
            passwordHash: 'Hash'
        })
        await newUser.save()
        const tokenille = {
            user: newUser.user,
            id: newUser.id
        }
        token = jwt.sign(tokenille, process.env.TOKEN_KEY)
    })
    test('Nimen voi vaihtaa', async () => {
        const result = await App.server.executeOperation({
            query: `mutation changeSettings( $name: String ) { changeSettings(name: $name) { name }}`,
            variables: { name: 'NewName'}
        }, { req: { headers: { authorization: `bearer ${token}`}}})
        expect(result.errors).toBeUndefined()
        expect(result.data.changeSettings.name).toBe('NewName')
    })
    test('Sähköpostin voi vaihtaa', async () => {
        const result = await App.server.executeOperation({
            query: 'mutation changeSettings( $email: String) { changeSettings(email: $email) { email }}',
            variables: { email: 'barbapapa@google.com' }
        }, { req: { headers: { authorization: `bearer ${token}`}}})
        expect(result.errors).toBeUndefined()
        expect(result.data.changeSettings.email).toBe('barbapapa@google.com')
    })
    test('Salasanan voi vaihtaa', async () => {
        const result = await App.server.executeOperation({
            query: 'mutation changeSettings( $password: String) { changeSettings(password: $password) { id }}',
            variables: { password:  'newPassword' }
        }, { req: { headers: { authorization: `bearer ${token}`}}})
        expect(result.errors).toBeUndefined()
        expect(result.data.changeSettings.id).toBeDefined()
        const updatedUser = await User.findById( result.data.changeSettings.id )
        expect(updatedUser.passwordHash).not.toBe('Hash')
    })
})