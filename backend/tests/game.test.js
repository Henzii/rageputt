const App = require('../App');
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

let token = '';

describe('Peleihin liittyvät testit', () => {
    beforeAll( async () => {
        //Luotaan käyttäjä ja token
        await User.deleteMany({})

        const uusiUser = new User({
            user: 'Testaaja',
            name: 'Teppo Testimies',
            email: '',
            passwordHash: 'Somehash'
        })
        await uusiUser.save();
        const tokenille = {
            user: uusiUser.user,
            id: uusiUser.id
        }
        token = jwt.sign(tokenille, process.env.TOKEN_KEY)
    })
    test('Token on validi', async () => {
        const resutl = App.server.executeOperation({
            query: `query getMe() { user id }`,
        }, {
            req: {
                headers: {
                    authorization: 'bearer ' + token
                }
            },
        
        })
    })
})
