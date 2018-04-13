const locationHelpers = require('../locationAPIs/locationHelpers');
const locationController = require('../locationAPIs/locationController');
const databaseController = require('../database/database-controller');
/**
 * This function generates a timestamp. This will be needed by each object to mark the 
 * update time that this object was last updated.
 *
 */
function timeStampGenerator() {
    return +new Date;
}
/**
 * 
 * @param {*The id of the car affected by the accident. } affectedCarId 
 * @param {*The location(GPS) of the car affected by the accident. } affectedCarLocation 
 * @param {*The exact road the car's walking on when the accident occured. } affectedCarRoad 
 */
function accidentOccured(affectedCarId, affectedCarData, affectedCarRoad) {
    let location = affectedCarData['location'];
    let accidentStatus = affectedCarData['accidentStatus'];
    let timestamp = affectedCarData['timestamp'];
    databaseController.checkAssigned
    databaseController.getAllAmbulances((ambulances) => {
        ambulances.forEach(ambulance => {
            console.log(ambulance)
        });
    });
    //assign to an ambulance/service car according to error level.
    //0- check if car is already assigned
    //1- get all ambulances
    //2- get the nearest ambulance
    //3- add a database entry for assignment


}

function runTests() {
    console.log(timeStampGenerator());
    console.log(typeof timeStampGenerator() == 'number' ? 'ASSERTED' : 'FAILELD');
    //let's test the google maps thing.

}
runTests();
module.exports = {
    timeStampGenerator,
    accidentOccured
}