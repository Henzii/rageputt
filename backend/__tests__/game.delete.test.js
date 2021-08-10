
const App = require('../App')
const mongoose = require('mongoose')
const { initDatabase, testUser1, testUser2, testGame } = require('./helpers')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Game = require('../models/Game')

let token =''

describe('Pelin poistamisen testit', () => {
    beforeAll( async () => {
        await initDatabase();
        token = jwt.sign({ user: testUser1.user, id: testUser1.id }, process.env.TOKEN_KEY)
    })
    test('Lähtötilanne ok', async () => {
        const players = testGame.players.map(g => g.user+'')
        expect(players).toContain(testUser1.id)
        expect(players).toContain(testUser2.id)
        
    })
    test('Pelin poisto pelaajalta (2 pelaajaa)', async () => {
        const result = await App.server.executeOperation({
            query: `mutation deleteGame($roundId: String!) {
                deleteGame( roundId: $roundId) {
                    id
                }
            }`, variables: { roundId: testGame.id }
        }, { req: { headers: { authorization: `bearer ${token}`}}})
        
        expect(result.errors).toBeUndefined()
        
        const alteredUser = await User.findById( testUser1.id )
        const alteredGame = await Game.findById( testGame.id ) 

        expect(alteredGame).not.toBeNull()
        expect(alteredUser.games.map(g=>g+'')).not.toContain( testGame.id )
        expect(alteredGame.players.map(g=>g.user+'')).not.toContain( testUser1.id )

    })
    test('Pelin poisto toiselta pelaajalta', async () => {
        token = jwt.sign({ user: testUser2.user, id: testUser2.id }, process.env.TOKEN_KEY)
        
        const result = await App.server.executeOperation({
            query: `mutation deleteGame($roundId: String!) {
                deleteGame( roundId: $roundId)
            }`, variables: { roundId: testGame.id }
        }, { req: { headers: { authorization: `bearer ${token}`}}})

        expect(result.errors).toBeUndefined()

        const alteredUser = await User.findById( testUser1.id )
        
        expect(alteredUser.games.map(g=>g+'')).not.toContain( testGame.id )

        const alteredGame = await Game.findById( testGame.id ) 
        
        expect(alteredGame).toBeNull()

    })
    afterAll( () => {
        mongoose.connection.close()
    })
})