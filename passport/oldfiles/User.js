var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new Schema({
    username: String,
    password: String,
    type: Number
})
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);