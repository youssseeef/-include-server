const locationHelpers = require('../locationAPIs/locationHelpers');
const locationController = require('../locationAPIs/locationController');
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
    //assign to an ambulance/service car according to error level.
    let location = affectedCarData['location'];


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