//This file should contain the main API endpoints of the app
// @author Youssseeef
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const algorithms = require('./algorithms');
const dbController = require('../database/database-controller');
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
 *
 */
app.post('/api/cars/request', (req, res) => {
    res.sendStatus(200);
});
/**
 * This endpoint is mainly responsible for receiving updates from a car.
 * This also checks when an accident happens - it does the assignment algorithm
 */
app.post('/api/cars/update', (req, res) => {
    console.log(req.body);
    let reqVerified = req.body.carId && req.body.carDataType && req.body.accidentFlag && req.body.speed && req.body.location
    if (reqVerified) {
        //Should update the database with the car details.
        //if there's an accident, should execute the accident algorithm
        res.sendStatus(200);
    } else {
        res.sendStatus(403)
    }
});
app.post('/api/sos/rescue', (req, res) => {
    res.sendStatus(200);
});
/**
 * This is what the ambulance gets its assignments from
 */
app.post('/api/sos/ambulance', (req, res) => {
    res.sendStatus(200);
});
/**
 * This API is responsible to clear the database
 * and restore it to its original state
 * 
 */
app.post('/api/restoredb', (req, res) => {
    res.sendStatus(200);
});
module.exports = app;