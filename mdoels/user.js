const mongoose = require("mongoose");
const uuidv1 = require('uuidv1')
const crypto = require('crypto');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        created: {
            type: Date,
            default: Date.now
        },
        updated: Date
    }
})

//virtual field
userSchema.virtual("password")
.set(function(password){
    //create temporary variable called _password
    this._password = password
    //generate a timestamp
    this.salt = uuidv1()
    // encryptPassword()
    this.hashed_password = this.encryptPassword(password)


})
.get(function() {
    return this.password
})

//methods
userSchema.methods = {
    encryptPassword: function(password){
        
        if(!password) return "";
        try{
            return crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
        }catch(err){
            return ""

        }
    }
}


module.exports = mongoose.model('User', userSchema)