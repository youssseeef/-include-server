/**
 * Run this file to test the functions of model verifier
 * 
 */

const modelsVerifier = require('./models-verifier');

/**
 * From Device Models verification
 */

//should return true
const goodAmbulanceModelFromDevice = {

};

//should return false
const badAmbulanceModelFromDevice = {

};


//should return true
const goodCarPacketModelFromDevice = {

};

//should return false
const badCarPacketModelFromDevice = {

};

//should return true
const goodRescueModelFromDevice = {

};
//should return false
const badRescueModelFromDevice = {

};


console.log('goodAmbulanceModelFromDevice: ' +
    modelsVerifier.verifyAmbulanceModelFromDevice(goodAmbulanceModelFromDevice) == true);

console.log('badAmbulanceModelFromDevice: ' +
    modelsVerifier.verifyAmbulanceModelFromDevice(badAmbulanceModelFromDevice) == false);

console.log('goodCarPacketModelFromDevice: ' +
    modelsVerifier.verifyCarPacketModelFromDevice(goodCarPacketModelFromDevice) == true);

console.log('badCarPacketModelFromDevice: ' +
    modelsVerifier.verifyCarPacketModelFromDevice(badCarPacketModelFromDevice) == false);

console.log('goodRescueModelFromDevice: ' +
    modelsVerifier.verifyRescueModelFromDevice(goodRescueModelFromDevice) == true);

console.log('badRescueModelFromDevice: ' +
    modelsVerifier.verifyRescueModelFromDevice(badRescueModelFromDevice) == false);