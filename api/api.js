/* This file should contain the main API endpoints of the app
 * This file should check the request against the required params
 * Then bypass the request to an internal function of the system
 * to do the required function.
 * @author Youssseeef
 * */
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const algorithms = require('./algorithms');
const dbController = require('../database/database-controller');
const gmaps = require('../locationAPIs/locationController');
const dataGenerator = require('../dataGenerator/generate-data');
//Middleware - body-parser json
app.use(bodyparser.json())

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
 */

app.post('/api/cars/request', (req, res) => {
    res.sendStatus(200);
});
/**
 * This endpoint is mainly responsible for receiving updates from a car.
 * This also checks when an accident happens - it does the assignment algorithm
 */
app.post('/api/cars/update', (req, res) => {
    //console.log(req);
    console.log(req.body)

    try {
        //req.body = JSON.parse(req.body);
        let reqVerified =
            req.body.carId &&
            req.body.accidentFlag &&
            req.body.speed &&
            req.body.location;
        //Should update the database with the car details.
        //if there's an accident, should execute the accident algorithm
        if (reqVerified) {
            dbController.updateCarData({
                    timestamp: algorithms.timeStampGenerator(),
                    speed: req.body.speed,
                    accidentFlag: req.body.accidentFlag,
                    location: location

                },
                req.body.carId
            )
            if (req.body.accidentFlag != 0) {
                //act accordingly //i will pass it here
                algorithms.accidentOccured();

            }
            res.sendStatus(200);
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
app.post('/api/sos/rescue', (req, res) => {
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