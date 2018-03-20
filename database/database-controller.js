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
    client.hget('cars', carId, function(returnedData) {
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

function updateRescueData(newData, carId) {
    client.hset('rescue', carId + '', JSON.stringify(newData));
}

function getRescueData(carId, callback) {
    client.hget('rescue', carId + '', function(returnedData) {
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

function updateAmbulanceData(newData, carId) {
    client.hset('ambulance', carId + '', JSON.stringify(newData));
}

function getAmbulanceData(carId, callback) {
    client.hget('ambulance', carId, function(returnedData) {
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
    addCarToRoad
}