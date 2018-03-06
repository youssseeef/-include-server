/**
 * This file should be runnable if the database is clean.
 * This initializes the server with the data for the cars and the initial stuff
 */
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);
const dbController = require('../database/database-controller');

// run with caution
let firstCarData = {
    id: 'cqowieucop98034ckle65689cwer2132we',
    data: {
        timestamp: 0,
        accident_status: 0,
        assignedRescue: 'none',
        assignedAmbulance: 'none'
    }
}

let secondCarData = {
    id: 'cqko8cq9pwe8jqcweikcqwdqweckkzfsdf',
    data: {
        timestamp: 0,
        accident_status: 0,
        assignedRescue: 'none',
        assignedAmbulance: 'none'
    }

}

let thirdCarData = {
    id: 'cwperocweromcw398ew39cwpeu9rucwere',
    data: {
        timestamp: '0',
        accident_status: '0',
        assignedRescue: 'none',
        assignedAmbulance: 'none'
    }
}
let fourthCarData = {
    id: 'cwejqmowieoqciwuoqeweuqoe98o92qouc',
    data: {
        timestamp: '0',
        accident_status: '0',
        assignedRescue: 'none',
        assignedAmbulance: 'none'
    }
}


let ambulanceData = {
    id: '12cqeqwceqwecvqwevqweqwioeuq8weuq3',
    timestamp: '0',

}
let ambulanceData2 = {
    id: 'cwkreoiucwmrw9er8cwp39ierw3cp9iw3p',
    timestamp: '0',

}
let rescueData = {
    id: 'mvwervwe9urmwvoewoieurowevirwoieru',
    timestamp: '0'
}
let rescueData2 = {
    id: 'doqcmwqoeu909mqwceuq098e90238e0234',
    timestamp: '0'
}


const clearDatabase = (callback) => {
    //will be cleared by the special API - for test purposes
    client.flushall((err, reply) => {
        callback();
    });
}

function clearAndReset() {
    clearDatabase(() => {
        initializeDatabase();
    })
    console.log('initCompleted');
}
const initializeDatabase = (() => {
    //initializing cars
    dbController.updateCarData(firstCarData.data, firstCarData.id);
    dbController.updateCarData(secondCarData.data, secondCarData.id);
    dbController.updateCarData(thirdCarData.data, thirdCarData.id);
    dbController.updateCarData(fourthCarData.data, fourthCarData.id);
    //initializing ambulances and rescues
    dbController.updateRescueData(rescueData, rescueData.id);
    dbController.updateRescueData(rescueData2, rescueData2.id);
    dbController.updateAmbulanceData(ambulanceData, ambulanceData.id);
    dbController.updateAmbulanceData(ambulanceData2, ambulanceData2.id);


})

module.exports = {
    clearAndReset,
    initializeDatabase
}