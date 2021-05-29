const mongoose = requirE('mongoose');

const skeema = new mongoose.Schema({
    
    finished: Boolean,
    timeStamp: String,
    currentRound: Number,

    players: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            tulokset: [Number]
        }
    ]
})

module.exports = mongoose.model('Games', skeema)