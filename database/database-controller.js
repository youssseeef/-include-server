const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);
/**
 * This file is supposed to be what interacts with the database
 * Functions should mainly update items in the database.
 * Function should touch the minimum possible of the database.
 * Large queries are not favorable.
 */

function updateCarData(newData, carId) {
    client.hset('cars', carId + '', JSON.stringify(newData));
}

function getCarData(carId, callback) {
    client.hget('cars', carId, function(returnedData) {
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
    getCarIdsApproxLocation
}