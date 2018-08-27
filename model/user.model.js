const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: false //only required for local user
    },
    facebookid:{
        type:String,
        required:false //only if it is a facebook user
    }
})

module.exports = mongoose.model('User',UserSchema);