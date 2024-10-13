const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    ufname: {
        type: String,
        required: true,
    },
    ulname: {
        type: String,
        required: true,
    },
    uemail: {
        type: String,
        required: true,
        unique: true,
    },
    uphone: {
        type: String,
        required: true,
        unique: true,
    },
    upass: {  // Added password field
        type: String,
        required: true,
    }
}, { 
    timestamps: true  // Automatically adds createdAt and updatedAt fields
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
