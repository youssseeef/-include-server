/**
 * This file should be runnable if the database is clean.
 * This initializes the server with the data for the cars and the initial stuff
 */
const redis = require('redis');
const client = redis.createClient();
// run with caution
let firstCarData = {
    id: 'cqowieucop98034ckle65689cwer2132we',
    timestamp: '123124123121243',
    accident_status: '0',
    assignedRescue: 'none',
    assignedAmbulance: 'none'
}

let secondCarData = {
    id: 'cqko8cq9pwe8jqcweikcqwdqweckkzfsdf',
    timestamp: '123124123121243',
    accident_status: '0',
    assignedRescue: 'none',
    assignedAmbulance: 'none'
}

let thirdCarData = {
    id: 'cwperocweromcw398ew39cwpeu9rucwere',
    timestamp: '123124123121243',
    accident_status: '0',
    assignedRescue: 'none',
    assignedAmbulance: 'none'
}

let ambulanceData = {
    id: '12cqeqwceqwecvqwevqweqwioeuq8weuq3',
    timestamp: '123124123121243',

}
let rescueData = {
    id: 'doqcmwqoeu909mqwceuq098e90238e0234',
    timestamp: '123124123121243'
}


const clearDatabase = () => {
    //will be cleared by the special API - for test purposes
}
const initializeDatabaseIfEmpty = () => {
    //this does fill the database with data if it's empty
}

module.exports = {
    clearDatabase,
    initializeDatabaseIfEmpty
}