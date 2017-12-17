let carPacketModelFromDevice = {
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
    speed: {
        type: 'number',
        required: true
    }
}

module.exports = carPacketModelFromDevice;