const redis = require('redis');
const client = redis.createClient();
/**
 * This file is supposed to be what interacts with the database
 * Functions should mainly update items in the database.
 * Function should touch the minimum possible of the database.
 * Large queries are not favorable.
 */

function updateCarData(newData, carId) {
    client.hset('cars', carId, newData);
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

module.exports = [
    updateCarData,
    getCarData
]