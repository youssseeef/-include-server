const ambulanceModelFromDevice = require('./ambulance-model-from-device.model');
const ambulanceModelInDatabase = require('./ambulance-model-in-database.model');
const carPacketModelFromDevice = require('./car-packet-model-from-device.model');
const carPacketModelInDatabase = require('./car-packet-model-in-database.model');
const rescueModelFromDevice = require('./rescue-model-from-device.model');
const rescueModelInDatabase = require('./rescue-model-in-database.model');

/**
 * Each of the following functions verifies that the input object
 * comforms with the model's design
 * That way, anyone can only add new data types in the model itself
 * without having to modify much code
 */
function verifyAmbulanceModelFromDevice() {

}

function verifyAmbulanceModelInDatabase() {

}

function verifyCarPacketModelFromDevice() {

}

function verifyCarPacketModelInDatabase() {

}
module.exports = {
    verifyAmbulanceModelFromDevice,
    verifyAmbulanceModelInDatabase,
    verifyCarPacketModelFromDevice,
    verifyCarPacketModelInDatabase
}