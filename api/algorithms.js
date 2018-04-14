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
function accidentOccured(affectedCarId, affectedCarData2, affectedCarRoad) {

    databaseController.getCarData(affectedCarId, (affectedCarData) => {
        let location = affectedCarData['location'];
        let accidentStatus = affectedCarData['accidentStatus'];
        let timestamp = affectedCarData['timestamp'];
        let ambulanceAssigned = affectedCarData['ambulanceAssigned'];
        //Check if there is no ambulance assignment to act upon it.
        //if there is one, that means the car has been assigned an ambulance.
        console.log("12312312" + affectedCarData['timestamp']);
        if (ambulanceAssigned === undefined) {
            console.log("GOT HERE!");

            databaseController.getAllAmbulances((ambulances) => {
                let ambulanceArray = [];
                Object.keys(ambulances).forEach(ambulance => {
                    ambulanceArray.push({
                        id: ambulance,
                        value: ambulances[ambulance]
                    });
                });
                ambulanceArray.forEach((element, index) => {
                    console.log(index);
                    console.log(element.value['location']);
                    console.log(element.value['carAssigned'] == null);
                    console.log(element.value['location'] !== null);
                    if ((element.value['location'] !== null) == true && (element.value['carAssigned'] == null) == true) {
                        //shouldn't be there but that's just for the MVP demo
                        //this is the only ambulance in the system now! This should definitely be changed
                        //in a final product.
                        console.log("I AM GROOT")
                        databaseController.setAmbulanceAssignedToCar(affectedCarId, element.id);
                        databaseController.setCarAssignedToAmbulance(element.id + "", affectedCarId);
                    }
                });
            });
        }

        //assign to an ambulance/service car according to error level.
        //0- check if car is already assigned
        //1- get all ambulances
        //2- get the nearest ambulance
        //3- add a database entry for assignment

    });


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