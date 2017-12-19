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
    carId: 'ceq23qd23q2exdqweqcq23q23',
    location: '12.4123,42.3142,4.4'
};

//should return false
const badAmbulanceModelFromDevice = {
    carId: 23123,
    location: '12.4123,42.3142,4.4'
};


//should return true
const goodCarPacketModelFromDevice = {
    carId: 'ceq23qd23q2exdqweqcq23q23',
    location: '12.4123,42.3142,4.4',
    accident_status: 2,
    speed: 23
};
//should return false
const badCarPacketModelFromDevice = {
    carId: 'ceq23qd23q2exdqweqcq23q23',
    location: '12.4123,42.3142,4.4',
    accident_status: 2,
    speed: '3124142123123'
};

//should return true
const goodRescueModelFromDevice = {
    carId: 'ceq23qd23q2exdqweqcq23q23',
    location: '12.4123,42.3142,4.4',
};
//should return false
const badRescueModelFromDevice = {
    carId: 4324234234234,
    location: '12.4123,42.3142,4.4'
};


console.log('goodAmbulanceModelFromDevice: ' +
    (modelsVerifier.verifyAmbulanceModelFromDevice(goodAmbulanceModelFromDevice) == true));

console.log('badAmbulanceModelFromDevice: ' +
    (modelsVerifier.verifyAmbulanceModelFromDevice(badAmbulanceModelFromDevice) == false));

console.log('goodCarPacketModelFromDevice: ' +
    (modelsVerifier.verifyCarPacketModelFromDevice(goodCarPacketModelFromDevice) == true));

console.log('badCarPacketModelFromDevice: ' +
    (modelsVerifier.verifyCarPacketModelFromDevice(badCarPacketModelFromDevice) == false));

console.log('goodRescueModelFromDevice: ' +
    (modelsVerifier.verifyRescueModelFromDevice(goodRescueModelFromDevice) == true));

console.log('badRescueModelFromDevice: ' +
    (modelsVerifier.verifyRescueModelFromDevice(badRescueModelFromDevice) == false));

/**
 * In Database Models Verification
 * 
 */

const goodAmbulanceModelInDatabase = {

};

//should return false
const badAmbulanceModelInDatabase = {

};


//should return true
const goodCarPacketModelInDatabase = {

};

//should return false
const badCarPacketModelInDatabase = {

};

//should return true
const goodRescueModelInDatabase = {

};
//should return false
const badRescueModelInDatabase = {

};
console.log('goodAmbulanceModelInDatabase: ' +
    (modelsVerifier.verifyAmbulanceModelInDatabase(goodAmbulanceModelInDatabase) == true));

console.log('badAmbulanceModelInDatabase: ' +
    (modelsVerifier.verifyAmbulanceModelInDatabase(badAmbulanceModelInDatabase) == false));

console.log('goodCarPacketModelInDatabase: ' +
    (modelsVerifier.verifyCarPacketModelInDatabase(goodCarPacketModelInDatabase) == true));

console.log('badCarPacketModelInDatabase: ' +
    (modelsVerifier.verifyCarPacketModelInDatabase(badCarPacketModelInDatabase) == false));

console.log('goodRescueModelInDatabase: ' +
    (modelsVerifier.verifyRescueModelInDatabase(goodRescueModelInDatabase) == true));

console.log('badRescueModelInDatabase: ' +
    (modelsVerifier.verifyRescueModelInDatabase(badRescueModelInDatabase) == false));