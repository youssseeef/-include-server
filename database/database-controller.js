const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);
/**
 * This file is supposed to be what interacts with the database
 * Functions should mainly update items in the database.
 * Function should touch the minimum possible of the database.
 * Large queries are not favorable.
 */


/**
 * This overwrites the car's data on the database.
 * @param {*} newData the data goes here.
 * @param {*} carId the id of the car that its data will change.
 * 
 */

function updateCarData(newData, carId) {
    client.hset('cars', carId + '', JSON.stringify(newData));
}

/**
 * 
 * @param {*} carId 
 * @param {*} callback 
 */
function getCarData(carId, callback) {
    client.hget('cars', carId, function(err, returnedData) {
        console.log(returnedData)
        try {
            let data = JSON.parse(returnedData);
            callback(data);
        } catch (err) {
            console.log({
                'error': 'Can not access car data from the database'
            })
        }
    })
}

function addMedicalUserToQR(medicalUserId, carId, callback) {
    client.hget('medicalAssociation', carId, (err, value) => {
        if (err) callback(err, null);
        if (value === "" || value === null || value === undefined) {
            //let's create it
            value = {}
            value[medicalUserId] = "not permanent";
            client.hset('medicalAssociation', carId, JSON.stringify(value));
            callback(null, { success: "QR added" });

        } else {
            //let's add it
            value = JSON.parse(value);
            value[medicalUserId] = "not permanent";
            client.hset('medicalAssociation', carId, JSON.stringify(value));
            callback(null, { success: "QR added" });
        }
    });
}


function getMedicalUsersAssociatedWithCar(carId, callback) {
    client.hget('medicalAssociation', carId, (err, value) => {
        if (err) callback(err, null);
        if (value === "" || value === null || value === undefined) {
            callback(null, { success: {} });

        } else {
            //let's add it
            value = JSON.parse(value);
            callback(null, { success: value });
        }
    });
}

function setMedicalToValue(carId, Value, callback) {
    client.hset('medicalAssociation', carId, JSON.stringify(Value), (err) => {
        callback(err);
    });
}

function updateRescueData(newData, rescueId, callback) {
    client.hset('rescue', rescueId + '', JSON.stringify(newData), (error) => {
        callback(error);
    });
}

function getRescueData(carId, callback) {
    client.hget('rescue', carId + '', function(err, returnedData) {
        try {
            let data = JSON.parse(returnedData);
            callback(data);
        } catch (err) {
            return {
                'error': 'Can not access car data from the database'
            }
        }
    })
}

function updateAmbulanceData(newData, ambulanceId, callback) {
    client.hset('ambulance', ambulanceId + '', JSON.stringify(newData), (error) => {
        callback(error);
    });
}

function getAmbulanceData(ambulanceId, callback) {
    client.hget('ambulance', ambulanceId + '', function(err, returnedData) {
        try {
            let data = JSON.parse(returnedData);
            callback(data);
        } catch (err) {
            return {
                'error': 'Can not access ambulance data from the database'
            }
        }
    })
}
//Since the number of ambulances will be probably less than 1000 in a city,
//That's not quite the big operation so let's do it!
function getAllAmbulances(callback) {
    client.hgetall('ambulance', (err, response) => {
        callback(response);
    })
}

function getAllRescues(callback) {
    client.hgetall('rescue', (err, response) => {
        callback(response);
    })
}
//sets the car assigned to the ambulance
function setCarAssignedToAmbulance(ambulanceId, carId) {
    getAmbulanceData(ambulanceId, (data) => {
        console.log(data);
        data['carAssigned'] = {
            carId
        };
        updateAmbulanceData(data, ambulanceId, (error) => {

        });
    })
}
//sets the car assigned to the rescue
function setCarAssignedToRescue(rescueId, carId) {
    getRescueData(rescueId, (data) => {
        console.log(data);
        data['carAssigned'] = {
            carId
        };
        updateRescueData(data, rescueId, (error) => {

        });
    })
}
//sets the ambulance assigned to the car
function setAmbulanceAssignedToCar(carId, ambulanceId) {
    getCarData(carId, (data) => {
        data['ambulanceAssigned'] = {
            ambulanceId
        };
        updateCarData(data, carId);
    })
}
//sets the rescue assigned to the car
function setRescueAssignedToCar(carId, rescueId) {
    getCarData(carId, (data) => {
        data['rescueAssigned'] = {
            rescueId
        };
        updateCarData(data, carId);
    })
}
//when the ambulance is ready to take the next request
function clearAmbulanceRequest(ambulanceId) {

}
//Upon fixing the car from the damage due to the accident
function clearCarAssignment(carId) {

}

function setApproxLocation(carId, long, lat, newData) {
    let longitude = parseFloat(parseFloat(String(long)).toFixed(2));
    let latitude = parseFloat(parseFloat(String(lat)).toFixed(2));
    client.hset('location_' + longitude + ';' + latitude, carId, JSON.stringify(newData));
}


function addCarToRoad(carId, accidentStatus, roadName, timeStamp) {
    let roadFullName = 'road_' + roadName;
    let value = {
        accidentStatus: accidentStatus,
        timeStamp: timeStamp
    }
    client.hset(roadFullName, carId, value);


}

function getCarsOnRoad(roadName, nowTimeStamp, timeDifference, callback) {
    let arrayOfCarsOnRoad = [];
    let accidentsOnRoad = [];
    let counter = 0;
    let roadFullName = 'road_' + roadName;
    client.hgetall(roadFullName, (err, response) => {
        Object.keys(response).forEach(key => {
            let carOnRoad = JSON.parse(response[key]);
            let accidentStatus = carOnRoad['accidentStatus'];
            let carTimeStamp = carOnRoad['timeStamp'];
            if (nowTimeStamp - carTimeStamp < timeDifference) {
                //this car is inside the time frame
                client.hget('cars', key + '', (err2, response2) => {
                    let carDetails = JSON.parse(response2);
                    arrayOfCarsOnRoad.push({
                        carDetails: carDetails,

                    })
                    if (carDetails.accidentStatus > 0) {
                        accidentsOnRoad.push(carDetails);
                    }
                    counter++;
                    if (Object.keys(response).length == counter) {
                        callback(arrayOfCarsOnRoad, accidentsOnRoad);
                    }
                });
            }
        });
        //should get all cars that are on the road
        //if one has an accident - add it to notification section if it's close
        //if not add it to the other section
    });
}

function getCarIdsApproxLocation(long, lat, callback) {
    let longitude = parseFloat(parseFloat(String(long)).toFixed(2));
    let latitude = parseFloat(parseFloat(String(lat)).toFixed(2));
    client.hgetall('location_' + longitude + ';' + latitude, (error, response) => {
        callback(JSON.parse(response));
    })
}

function resetTheDemo() {
    client.hset('cars', 'cqowieucop98034ckle65689cwer2132we', `{"timestamp":1523680912943,"speed":50,"accidentStatus":1,"location":{"longitude":31.20388,"latitude":29.87504}}`);
    client.hset('ambulance', 'c12qeqwceqwecvqwevqweqwioeuq8weuq3', `{"location":{"longitude":29.89186,"latitude":31.16739}}`)
}
module.exports = {
    updateCarData,
    getCarData,
    updateAmbulanceData,
    getAmbulanceData,
    updateRescueData,
    getRescueData,
    setApproxLocation,
    getCarIdsApproxLocation,
    getCarsOnRoad,
    addCarToRoad,
    getAllAmbulances,
    setCarAssignedToAmbulance,
    setAmbulanceAssignedToCar,
    clearCarAssignment,
    clearAmbulanceRequest,
    resetTheDemo,
    addMedicalUserToQR,
    getMedicalUsersAssociatedWithCar,
    getAllRescues,
    setRescueAssignedToCar,
    setCarAssignedToRescue,
    setMedicalToValue,
}