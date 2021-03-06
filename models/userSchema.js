const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    age: {
        type: Number,
        required: [true, 'Age is required']
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: [true, 'Gender is required']
    },
    pets: {
        type: Array,
        required: [false, 'Pets are necessary']
    }
   
})  

const User = mongoose.model("userdb", userSchema)

module.exports = User