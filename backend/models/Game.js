const mongoose = require('mongoose');

const skeema = new mongoose.Schema({

    finished: Boolean,
    timestamp: Date,

    players: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            tulokset: [],
            _id: false
        }
    ]
})

module.exports = mongoose.model('Games', skeema)