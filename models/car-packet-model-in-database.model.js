let carPacketModelInDatabase = {
    carId: {
        type: 'string',
        required: true
    },
    location: {
        type: 'string',
        required: true
    },
    accident_status: {
        type: 'number',
        required: true
    },
    timestamp: {
        type: 'number',
        required: true
    },


}
module.exports = carPacketModelInDatabase;