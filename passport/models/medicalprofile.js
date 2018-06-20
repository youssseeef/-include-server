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
        type: String,
        required: false
    },
    smoker: {
        type: String,
        required: false
    },
    cancer: {
        type: String,
        required: false
    },
    chronicObstructive: {
        type: String,
        required: false
    },
    disease: {
        type: String,
        required: false
    },
    clotticDisorder: {
        type: String,
        required: false
    },
    heartFailure: {
        type: String,
        required: false
    },
    diabetes: {
        type: String,
        required: false
    },
    emhysema: {
        type: String,
        required: false
    },
    hepatitis: {
        type: String,
        required: false
    },
    hyperTension: {
        type: String,
        required: false
    },
    myocardialInfraction: {
        type: String,
        required: false
    },
    seizures: {
        type: String,
        required: false
    },
    strokes: {
        type: String,
        required: false
    },



});


module.exports = mongoose.model('MedicalUser', MedicalUserSchema);