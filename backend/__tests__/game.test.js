const App = require('../App');
const User = require('../models/User')
const Game = require('../models/Game')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

let token = '';

const User1 = new User( {
    user: 'testeri1',
    name: 'Mr. Tester 1',
    passwordHash: 'Hash'    
})
const User2 = new User( {
    user: 'testeri2',
    name: 'Mr Tester 2',
    passwordHash: 'Hash'
})

describe('Peleihin liittyvät testit', () => {
    beforeAll( async () => {
        //Alustetaan database

        await User.deleteMany({})
        await Game.deleteMany({})

        await User1.save();
        await User2.save();
        
        const tokenille = {
            user: User1.user,
            id: User1.id
        }
        token = jwt.sign(tokenille, process.env.TOKEN_KEY)
    })
    test('Token on validi', async () => {
        const result = await App.server.executeOperation({
            query: `query getMe { getMe { user name id } }`,
        }, {
            req: {
                headers: {
                    authorization: 'bearer ' + token
                }
            },
        
        })
        expect(result.errors).toBeUndefined()
        expect(result.data.getMe).not.toBeNull()
    })
    test('Pelin lisäys onnistuu', async () => {
        const result = await App.server.executeOperation({
            query: `mutation createGame($pelaajat: [String]) { createGame(pelaajat: $pelaajat) }`,
            variables: { pelaajat: [User2.id]}
        }, { req: { headers: { authorization: `bearer ${token}`}}});
        expect(result.errors).toBeUndefined()
        const peliId = result.data.createGame;
        expect(peliId).toBeDefined()
    })
    afterAll(async () => {
        mongoose.connection.close()
    })
})
