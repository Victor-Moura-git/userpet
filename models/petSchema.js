const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pet name is required']
    },
    race: {
        type: String,
        required: [true, 'Race is required']
    }
})

const Pet = mongoose.model("petdb", petSchema)

module.exports = Pet