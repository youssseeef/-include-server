let rescueModelInDatabase = {
    carId: {
        type: 'string',
        required: true
    },
    location: {
        type: 'string',
        required: true
    },
    timestamp: {
        type: 'number',
        required: true
    },
    assigned: {
        type: 'boolean',
        required: true
    },
    assignedTo: {
        type: 'string',
        required: false
    },
    assignedTimeStamp: {
        type: 'number',
        required: false
    }
}
module.exports = rescueModelInDatabase;