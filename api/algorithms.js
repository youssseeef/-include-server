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
    //TODO: check for the type if there are many. That would be helpful
    //this todo is while doing the map.
    databaseController.getCarData(affectedCarId, (affectedCarData) => {
        let location = affectedCarData['location'];
        console.log(location)
        let accidentStatus = affectedCarData['accidentStatus'];
        let timestamp = affectedCarData['timestamp'];
        let ambulanceAssigned = affectedCarData['ambulanceAssigned'];
        let rescueAssigned = affectedCarData['rescueAssigned'];
        //Check if there is no ambulance assignment to act upon it.
        //if there is one, that means the car has been assigned an ambulance.
        console.log("acdsad" + affectedCarData['ambulanceAssigned']);
        if (ambulanceAssigned == undefined) {
            console.log("GOT HERE!");

            databaseController.getAllAmbulances((ambulances) => {
                let ambulanceArray = [];
                Object.keys(ambulances).forEach(ambulance => {
                    ambulanceArray.push({
                        id: ambulance,
                        value: ambulances[ambulance]
                    });
                });
                let minimumDistance = 99999999;
                let minimumId = null;
                ambulanceArray.forEach((element, index) => {
                    console.log(index);
                    console.log(element);
                    console.log("LOC LOC LOC DEV" + element.value.location);
                    console.log(element.value['carAssigned'] == null);
                    console.log(element.value['location'] !== null);
                    if ((element.value['location'] !== null) == true && (element.value['carAssigned'] == null) == true) {
                        //shouldn't be there but that's just for the MVP demo
                        //this is the only ambulance in the system now! This should definitely be changed
                        //in a final product.
                        console.log("I AM GROOT")
                        console.log(location);
                        let currentDistance = locationHelpers.calcCrow(location.latitude,
                            location.longitude, element.value['location']['latitude'], element.value['location']['longitude']);
                        if (currentDistance < minimumDistance) {
                            minimumDistance = currentDistance;
                            minimumId = element.id;
                        }

                    }
                });
                databaseController.setAmbulanceAssignedToCar(affectedCarId, minimumId);
                databaseController.setCarAssignedToAmbulance(minimumId + "", affectedCarId);
            });
        }
        if (rescueAssigned == undefined) {
            console.log("GOT HERE! RESCUE");

            databaseController.getAllRescues((rescues) => {
                console.log(rescues)
                let rescueArray = [];
                Object.keys(rescues).forEach(rescue => {
                    rescueArray.push({
                        id: rescue,
                        value: rescues[rescue]
                    });
                });

                rescueArray.forEach((element, index) => {
                    console.log(index);
                    console.log(element)
                    console.log(element.value['location']);
                    console.log(element.value['carAssigned'] == null);
                    console.log(element.value['location'] !== null);
                    if ((element.value['location'] !== null) == true && (element.value['carAssigned'] == null) == true) {
                        //shouldn't be there but that's just for the MVP demo
                        //this is the only ambulance in the system now! This should definitely be changed
                        //in a final product.

                        console.log("I AM GROOT")

                        //databaseController.setRescueAssignedToCar(affectedCarId, element.id);
                        //databaseController.setCarAssignedToRescue(element.id + "", affectedCarId);
                    }
                });
                databaseController.setRescueAssignedToCar(affectedCarId, minimumId);
                databaseController.setCarAssignedToRescue(minimumId + "", affectedCarId);
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