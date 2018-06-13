var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');



var MedicalUserSchema = new Schema({
    //username here is email. PW and usertype from other model
    username: {
        type: String,
        unique: true,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false
    },
    emergencyContactName: {
        type: String,
        required: false
    },
    emergencyPhoneNumber: {
        type: String,
        required: false
    },
    birthYear: {
        type: String,
        required: false
    },
    birthMonth: {
        type: String,
        required: false
    },
    birthDay: {
        type: String,
        required: false
    },
    surgicalHistory: {
        type: String,
        required: false
    },
    currentMedications: {
        type: String,
        required: false
    },
    allergiesToDrugs: {
        type: String,
        required: false
    },
    bloodGroup: {
        type: String,
        required: false
    },
    addict: {
        type: Boolean,
        required: false
    },
    smoker: {
        type: Boolean,
        required: false
    },
    cancer: {
        type: Boolean,
        required: false
    },
    chronicObstructive: {
        type: Boolean,
        required: false
    },
    disease: {
        type: Boolean,
        required: false
    },
    clotticDisorder: {
        type: Boolean,
        required: false
    },
    heartFailure: {
        type: Boolean,
        required: false
    },
    diabetes: {
        type: Boolean,
        required: false
    },
    emhysema: {
        type: Boolean,
        required: false
    },
    hepatitis: {
        type: Boolean,
        required: false
    },
    hyperTension: {
        type: Boolean,
        required: false
    },
    myocardialInfraction: {
        type: Boolean,
        required: false
    },
    seizures: {
        type: Boolean,
        required: false
    },
    strokes: {
        type: Boolean,
        required: false
    },



});


module.exports = mongoose.model('MedicalUser', MedicalUserSchema);