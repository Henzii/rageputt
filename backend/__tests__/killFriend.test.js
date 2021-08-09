const App = require('../App')
const mongoose = require('mongoose')
const { initDatabase, testUser1, testUser2, testGame } = require('./helpers')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Game = require('../models/Game')

let token = ''

describe('Kaverin poistotestit', () => {
    beforeAll(async () => {
        await initDatabase();
        token = jwt.sign({ user: testUser1.user, id: testUser1.id }, process.env.TOKEN_KEY)
        testUser1.friends.push( testUser2.id );
        testUser2.friends.push( testUser1.id );
        await testUser1.save();
        await testUser2.save();
    })
    test('Testikäyttäjät ovat kavereita', async () => {
        const newUser = await User.findById( testUser1.id )
        expect(newUser.friends.map(f=>f+'')).toContain( testUser2.id )
    })
    test('Kaverin poisto poistaa kaverin molemmilta', async () => {
        const result = await App.server.executeOperation({
            query: `
                mutation deleteFriend($userId: ID!) {
                    deleteFriend(userId: $userId)
                }
            `,
            variables: { userId: testUser2.id }
        }, { req: { headers: { authorization: `bearer ${token}`}}})
        expect(result.errors).toBeUndefined()
        
        const getUser = await User.findById( testUser1.id )
        expect( getUser.friends.map(f=>f+'')).not.toContain( testUser2.id )
        
        const getUser2 = await User.findById( testUser2.id )
        expect( getUser2.friends.map(f=>f+'')).not.toContain( testUser1.id )
    })
    test('Jos kaveripyynnöt estetty, pyyntö palauttaa errorin', async () => {
        testUser2['ignoreFriendRequests'] = true
        testUser2.friends = []
        testUser1.friends= []
        await testUser2.save();
        await testUser1.save();
        const result = await App.server.executeOperation({
            query: `
                mutation sendFriendRequest($fName: String!) {
                    sendFriendRequest(fName: $fName)
                }
            `,
            variables: { fName: testUser2.user }
        }, { req: { headers: { authorization: `bearer ${token}`}}})
        expect(result.errors).toBeDefined()

        const getUser = await User.findById( testUser2.id )
        console.log(getUser)
        expect(getUser.friendRequests.map(f=>f+'')).not.toContain(testUser1.id)
    })
    afterAll( () => {
        mongoose.connection.close();
    })
})