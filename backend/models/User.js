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
    }
})

skeema.plugin(validator);

module.exports = mongoose.model('User', skeema)