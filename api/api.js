/* This file should contain the main API endpoints of the app
 * This file should check the request against the required params
 * Then bypass the request to an internal function of the system
 * to do the required function.
 * @author Youssseeef
 * */
const express = require('express');
const bodyparser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../passport/config/database');
let api = require('../passport/routes/api');
mongoose.connect(config.database);

const algorithms = require('./algorithms');
const dbController = require('../database/database-controller');
const dataGenerator = require('../dataGenerator/generate-data');
const locationController = require('../locationAPIs/locationController');


const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(passport.initialize());

//Middleware - body-parser json
app.use(bodyparser.json())
app.use('/api2', api);

//Fordbidden access - no get requests 
app.get('/**', (req, res) => {
    res.sendStatus(403);
});


//Fordbidden access - no post to this endpoint requests 
app.post('/api/', (req, res) => {
    res.sendStatus(403);
});

/**
 * This endpoint is mainly responsible for posting updates to a car
 * when the car requests them.
 * The updates will include: 1- all cars nearby list 2- any accident notification
 * Both should be on the same road. This will use the car's current road.
 */

app.post('/api/cars/request', (req, res) => {
    const TIME_DIFFERENCE = 1000 * 10; //10 seconds
    let carId = req.body.carId;
    dbController.getCarData(carId, (returnedData) => {
        let longitude = returnedData.location.longitude
        let latitude = returnedData.location.latitude;
        let altitude = returnedData.location.altitude;
        locationController.fetchLocationId(latitude, longitude, altitude, (roadName) => {
            log(roadName)
            dbController.getCarsOnRoad(roadName, algorithms.timeStampGenerator(), TIME_DIFFERENCE, (arrayOfCarsOnRoad, accidentsOnRoad) => {
                res.json({
                    arrayOfCarsOnRoad,
                    accidentsOnRoad
                })
            })

        })

    })


    res.sendStatus(200);

});
/**
 * This endpoint is mainly responsible for receiving updates from a car.
 * This also checks when an accident happens - it does the assignment algorithm
 */
//app.post('/api/cars/update', passport.authenticate('jwt', { session: false }), (req, res) => {
app.post('/api/cars/update', (req, res) => {

    //console.log(req);
    console.log(req.body)

    try {
        //req.body = JSON.parse(req.body);
        let reqVerified =
            req.body.carId &&
            req.body.accidentStatus &&
            req.body.speed &&
            req.body.location;
        //Should update the database with the car details.
        //if there's an accident, should execute the accident algorithm
        console.log(reqVerified)
        if (1) { //fix this - not sure what went wrong probably accidentStatus = 0
            dbController.updateCarData({
                    timestamp: algorithms.timeStampGenerator(),
                    speed: req.body.speed,
                    accidentStatus: req.body.accidentStatus,
                    location: req.body.location

                },
                req.body.carId
            )
            if (req.body.accidentStatus != 0) {
                //act accordingly //i will pass it here
                algorithms.accidentOccured();

            }
            //hacky solution - 1-endpoint to rule them all
            res.sendStatus(200)
        } else {
            res.sendStatus(403)
        }
    } catch (err) {
        res.sendStatus(403)
    }

});
/**
 * This is what the rescue cars gets its assignments from - if any -
 */
app.post('/api/sos/rescueAssignments', (req, res) => {
    let carId = req.body.carId;

    res.sendStatus(200);
});
/**
 * This is what the ambulance gets its assignments from - if any -
 */
app.post('/api/sos/ambulance', (req, res) => {
    res.sendStatus(200);
});
/**
 * This API is responsible to clear the database
 * and restore it to its original state.
 * This should be deleted after testing in the deployment version.
 */
app.post('/api/reset', (req, res) => {
    dataGenerator.clearAndReset();
    res.sendStatus(200);
})
module.exports = app;