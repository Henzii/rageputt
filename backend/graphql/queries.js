const { ForbiddenError, AuthenticationError } = require('apollo-server');
const UserModel = require('../models/User')
const GameModel = require('../models/Game')

const Query = {
    getMe: async (root, args, context) => {
        if (!context.loggedUser) throw new AuthenticationError('Kirjaudu sisään')
        const user = await UserModel.findById(context.loggedUser.id).populate('friends', { user: 1, name: 1, id: 1, email: 1 }).populate('friendRequests', { user: 1, name: 1, id: 1 })
        return {
            user: user.user,
            name: user.name,
            id: user.id,
            email: user.email,
            friendRequests: user.friendRequests,
            friends: user.friends
        }
    },
    getGames: async (root, args, context) => {
        if (!context.loggedUser) {
            throw new AuthenticationError('Kirjaudu sisään.')
        }
        const user = await UserModel.findById(context.loggedUser.id).populate(
            {
                path: 'games',
                populate: {
                    path: 'players.user',
                    select: { user: 1, name: 1 }
                }
            })
        return user.games;
    },
    usersCount: () => users.length,
    users: async () => UserModel.find({}).populate('friends', { user: 1 }).populate('friendRequests', { user: 1, name: 1, id: 1 }),
    getRound: async (root, args) => {
        if (args.rounId === null || args.roundId === '') return null
        const rundi = await GameModel.findById(args.roundId).populate('players.user')
        if (!rundi) {
            throw new ForbiddenError('Epäkelpo ID')
        }
        return rundi;
    },
    isUsernameAvailable: async (root, args, context) => {
        const user = await UserModel.findOne({ user: args.user.toLowerCase() })
        if (user === null) return true;
        return false;
    }
}
module.exports = Query