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
    let ambulanceAssigned = affectedCarData['ambulanceAssigned'];
    //Check if there is no ambulance assignment to act upon it.
    //if there is one, that means the car has been assigned an ambulance.
    if (ambulanceAssigned == undefined) {
        console.log("GOT HERE!");

        databaseController.getAllAmbulances((ambulances) => {
            let ambulanceArray = [];
            Object.keys(ambulances).forEach(ambulance => {
                ambulanceArray.push(ambulances[ambulance]);
            });
            ambulanceArray.forEach(element => {
                console.log(element)
            });
        });
    }

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