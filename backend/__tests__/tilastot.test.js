const App = require('../App')
const mongoose = require('mongoose')
const { initDatabase, testUser1, testUser2, testGame, testGame2 } = require('./helpers')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Game = require('../models/Game')

let token =''

describe('Pelin poistamisen testit', () => {
    beforeAll( async () => {
        await initDatabase();
        token = jwt.sign({ user: testUser1.user, id: testUser1.id }, process.env.TOKEN_KEY)
    })
    test('Omat pelit saadaan ok', async () => {
        const result = await App.server.executeOperation({
            query: `query getGames { getGames { id } }`,
        }, {
            req: {
                headers: {
                    authorization: 'bearer ' + token
                }
            },
        
        })
        expect(result.errors).toBeUndefined()
        expect(result.data.getGames[0].id).toBe( testGame.id+'' )
        expect(result.data.getGames[1].id).toBe( testGame2.id+'' )
    })
    test('Error jos kaveri ei jaa tilastojaan', async () => {
        const result = await App.server.executeOperation({
            query: `query getGames( $userId: ID) { getGames(userId: $userId) { id } }`,
            variables: { userId: testUser2.id }
        }, {
            req: {
                headers: {
                    authorization: 'bearer ' + token
                }
            },
        
        })
        console.log(result)
        expect(result.errors).toBeDefined()
    })

    test('Kaverin peli saadaan ok', async () => {
        // Testuser 2 kyselee...
        token = jwt.sign({ user: testUser2.user, id: testUser2.id }, process.env.TOKEN_KEY)
        
        testUser1.friends.push( testUser2.id )  // Lisätään kaveriksi jotta ei tule erroria
        await testUser1.save()
        
        const result = await App.server.executeOperation({
            query: `query getGames( $userId: ID) { getGames(userId: $userId) { id } }`,
            variables: { userId: testUser1.id }
        }, {
            req: {
                headers: {
                    authorization: 'bearer ' + token
                }
            },
        
        })
        expect(result.errors).toBeUndefined()
        expect(result.data.getGames[1]).toBeDefined()
        expect(result.data.getGames[1].id).toBe( testGame2.id+'')
    })
    afterAll( () => {
        mongoose.connection.close();
    })
})