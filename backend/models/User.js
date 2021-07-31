const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator')

const skeema = new mongoose.Schema({
    user: {
        type: String,
        unique: true,
        required: true,
        minlength: 3
    },
    name: {
        type: String,
        minlength: 3
    },
    passwordHash: {
        type: String,
        required: true,
    },
    games: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Games'
        }
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    friendRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    tempPasswordHash: String,
    email: String,
    shareStats: Boolean
})

skeema.plugin(validator);

module.exports = mongoose.model('User', skeema)