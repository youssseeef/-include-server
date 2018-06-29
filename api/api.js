/* This file should contain the main API endpoints of the app
 * This file should check the request against the required params
 * Then bypass the request to an internal function of the system
 * to do the required function.
 * @author Youssseeef
 * */

//this are the main modules used
const express = require('express');
const bodyparser = require('body-parser');
//used for validation and authentication and userdata
var mongoose = require('mongoose');
var passport = require('passport');
//used for the configuration and secrets. Grabs them from env vars
var config = require('../passport/config/database');
//these are the routes for signin-up and signin-in
let api = require('../passport/routes/api');
//connects mangoose to db
mongoose.connect(config.database);
//local helpers, these modules are the main modules.
const algorithms = require('./algorithms');
const dbController = require('../database/database-controller');
const dataGenerator = require('../dataGenerator/generate-data');
const locationController = require('../locationAPIs/locationController');

//express initialization
const app = express();

//Access Control Middleware - provides access to different domains
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//this initializes passport for authentication for some specific modules
app.use(passport.initialize());

//Middleware - body-parser json
app.use(bodyparser.json());
//authentication middleware on api2 endpoint
app.use('/api2', api);
/**
 * This API is responsible to clear the database
 * and restore it to its original state.
 * This should be deleted after testing in the deployment version.
 */
app.get('/api/reset', (req, res) => {
    dbController.resetTheDemo();
    res.sendStatus(200);
});
//Forbidden access - no get requests 
app.get('/**', (req, res) => {
    res.sendStatus(403);
});


//Forbidden access - no post to this endpoint requests 
app.post('/api/', (req, res) => {
    res.sendStatus(403);
});

/**
 * These are the main endpoints of our system. /api/ endpoint is for location/updates related functionality.
 */


/**
 * This endpoint is mainly responsible for posting updates to a car
 * when the car requests them.
 * The updates will include: 1- all cars nearby list 2- any accident notification
 * Both should be on the same road. This will use the car's current road.
 */

app.post('/api/cars/request', (req, res) => {
    const TIME_DIFFERENCE = 1000 * 10; //10 seconds
    if (req.body !== null && req.body.carId !== null) {
        dbController.getCarData(req.body.carId, (returnedData) => {
            //location data returned from the car, we'll use it to get the data from the database
            //for the nearby cars
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

        });
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }


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
            req.body.carId !== null &&
            req.body.accidentStatus !== null &&
            req.body.speed !== null &&
            req.body.location !== null;
        //Should update the database with the car details.
        //if there's an accident, should execute the accident algorithm
        console.log(reqVerified)
        if (1) { //fix this - not sure what went wrong probably accidentStatus = 0
            dbController.getCarData(req.body.carId + "", (oldCarData) => {
                oldCarData['timestamp'] = algorithms.timeStampGenerator();
                oldCarData['speed'] = req.body.speed;
                oldCarData['accidentStatus'] = req.body.accidentStatus;
                oldCarData['location'] = req.body.location;
                dbController.updateCarData(oldCarData, req.body.carId)
            });

            if (req.body.accidentStatus == 1 || req.body.accidentStatus == 3 || req.body.accidentStatus == 6 || req.body.accidentStatus == 8) {
                //act accordingly //i will pass it here
                //
                algorithms.accidentOccured(req.body.carId, {
                    timestamp: algorithms.timeStampGenerator(),
                    speed: req.body.speed,
                    accidentStatus: req.body.accidentStatus,
                    location: req.body.location
                }, "random road for now");

            }
            res.sendStatus(200)
        } else {
            res.sendStatus(403)
        }
    } catch (err) {
        res.sendStatus(403)
    }

});

//this should return a JSON object containing usernames
//of users that were added to the database of users for a specific user.

app.post('/api/cars/getAssociatedQRs', (req, res) => {
    //this should return some json object containing an array
    if (req !== null && req.body !== null && req.body.carId !== null) {
        dbController.getMedicalUsersAssociatedWithCar(req.body.carId, (err, response) => {
            if (err) return res.sendStatus(404);
            if (response) {
                return res.json(response);
            } else {
                return res.sendStatus(404);
            }
        });
    } else {
        return res.sendStatus(404);
    }
});

/**
 * Delete Medical User
 */

app.post('/api/cars/deleteMedicalUser', (req, res) => {
    if (req !== null && req.body !== null && req.body.carId !== null && req.body.userToBeDeleted) {
        let userToBeDeleted = req.body.userToBeDeleted;
        dbController.getMedicalUsersAssociatedWithCar(req.body.carId, (err, response) => {
            if (err) return res.sendStatus(404);
            console.log(response.success)
            if (response && response.success && response.success.hasOwnProperty(userToBeDeleted)) {
                delete response.success[userToBeDeleted];
                dbController.setMedicalToValue(req.body.carId, response.success, (err) => {
                    console.log(err);
                    if (err) return res.sendStatus(404);
                });
                return res.sendStatus(200);
            } else {
                return res.sendStatus(404);
            }
        });
    } else {
        return res.sendStatus(404);
    }

});

/**
 * This is what the rescue cars gets its assignments from - if any -
 */
app.post('/api/sos/rescue', (req, res) => {
    let carId = req.body.carId;

    res.sendStatus(200);
});

/**
 * This is what the ambulance gets its assignments from - if any -
 */
app.post('/api/sos/getAmbulanceData', (req, res) => {
    let reqVerified = req !== undefined &&
        req.body !== undefined &&
        req.body.ambulanceId !== undefined;
    if (reqVerified) {
        dbController.getAmbulanceData(req.body.ambulanceId, (oldAmbData) => {
            try {
                return res.json(oldAmbData);
            } catch (error) {
                return res.status(404).json({
                    error: "Not JSON data."
                });

            }
        });
    } else {
        return res.status(404).json({
            error: "wrong request"
        });
    }
});

//this should clear the accident from the ambulance's side.
app.post('/api/sos/endAccident', (req, res) => {

    let reqVerified = req !== undefined &&
        req.body.ambulanceId !== undefined;
    console.log(reqVerified);

    if (reqVerified) {
        dbController.getAmbulanceData(req.body.ambulanceId, (oldAmbData) => {
            console.log(oldAmbData);
            if (oldAmbData === null || oldAmbData === undefined) {
                return res.status(403).json({ error: "wrong params" });

            } else {
                let newAmbData = oldAmbData;
                delete newAmbData.carAssigned;
                console.log(newAmbData);
                console.log(typeof newAmbData)
                dbController.updateAmbulanceData(newAmbData, req.body.ambulanceId, (error) => {
                    console.log('HEREHERE');
                    console.log(error)
                    if (error === null || error === undefined) {
                        console.log(error);
                        return res.json({ updated: "accident ended" });
                    } else {
                        console.log('got here')
                        return res.status(403).json({ error: "some error happened" });
                    }

                });
            }
        });
    } else {
        console.log('got here...')
        return res.status(403).json({ "error": "wrong params" });
    }



});

/**
 * This is what the ambulance updates its location
 */

app.post('/api/sos/updateAmbulance', (req, res) => {
    console.log(req.body)
    let reqVerified = req !== undefined &&
        req.body !== undefined &&
        req.body.longitude !== undefined &&
        req.body.latitude !== undefined &&
        req.body.ambulanceId !== undefined &&
        req.body.ambulanceReadyToTake !== undefined;
    if (reqVerified) {

        dbController.getAmbulanceData(req.body.ambulanceId, (oldAmbData) => {

            let newAmbData = oldAmbData;
            if (newAmbData === undefined || newAmbData === null) {

                newAmbData = {};
            }

            newAmbData['location'] = {
                longitude: parseFloat(parseFloat(req.body.longitude).toFixed(5)),
                latitude: parseFloat(parseFloat(req.body.latitude).toFixed(5))
            };

            newAmbData['ambulanceReadyToTake'] = req.body.ambulanceReadyToTake;

            dbController.updateAmbulanceData(newAmbData, req.body.ambulanceId, (errrrr) => {

                dbController.getAmbulanceData(req.body.ambulanceId, (ambData) => {
                    console.log(ambData)
                    if (ambData['carAssigned'] !== undefined) {
                        console.log("RESPONSE SENT!")
                        dbController.getCarData(ambData['carAssigned']['carId'], (carData) => {
                            return res.json({
                                carAssigned: ambData['carAssigned'],
                                carLocation: carData['location']
                            });
                        })

                    } else {

                        return res.json({
                            none: "none"
                        });

                    }
                })
            });
        })


    } else {

        return res.sendStatus(403);
    }
    //res.sendStatus(200);
});




/**
 * Rescue Car Endpoints
 * Basically another ambulance on steroids!
 * 
 * 
 * 
 * 
 * 
 * 
 * RESCUE AREA DO NOT GET CONFUSED MATE
 */



/**
 * This is what the rescue gets its assignments from - if any -
 */
app.post('/api/sos/getRescueData', (req, res) => {
    let reqVerified = req !== undefined &&
        req.body !== undefined &&
        req.body.rescueId !== undefined;
    if (reqVerified) {
        dbController.getRescueData(req.body.rescueId, (oldRescueData) => {
            try {
                return res.json(oldRescueData);
            } catch (error) {
                return res.status(404).json({
                    error: "Not JSON data."
                });

            }
        });
    } else {
        return res.status(404).json({
            error: "wrong request"
        });
    }
});

//this should clear the accident from the rescue's side.
app.post('/api/sos/endRescueAccident', (req, res) => {

    let reqVerified = req !== undefined &&
        req.body.rescueId !== undefined;
    console.log(reqVerified);

    if (reqVerified) {
        dbController.getRescueData(req.body.rescueId, (oldRescueData) => {
            console.log(oldRescueData);
            if (oldRescueData === null || oldRescueData === undefined) {
                return res.status(403).json({ error: "wrong params" });

            } else {
                let newRescueData = oldRescueData;
                delete newRescueData.carAssigned;
                console.log(newRescueData);
                console.log(typeof newRescueData)
                dbController.updateRescueData(newRescueData, req.body.rescueId, (error) => {
                    console.log('HEREHERE');
                    console.log(error)
                    if (error === null || error === undefined) {
                        console.log(error);
                        return res.json({ updated: "accident ended" });
                    } else {
                        console.log('got here')
                        return res.status(403).json({ error: "some error happened" });
                    }

                });
            }
        });
    } else {
        console.log('got here...')
        return res.status(403).json({ "error": "wrong params" });
    }
});

/**
 * This is what the rescue updates its location
 */

app.post('/api/sos/updateRescue', (req, res) => {
    console.log(req.body)
    let reqVerified = req !== undefined &&
        req.body !== undefined &&
        req.body.longitude !== undefined &&
        req.body.latitude !== undefined &&
        req.body.rescueId !== undefined &&
        req.body.rescueReadyToTake !== undefined;
    if (reqVerified) {

        dbController.getRescueData(req.body.rescueId, (oldRescueData) => {

            let newRescueData = oldRescueData;
            if (newRescueData === undefined || newRescueData === null) {

                newRescueData = {};
            }

            newRescueData['location'] = {
                longitude: parseFloat(parseFloat(req.body.longitude).toFixed(5)),
                latitude: parseFloat(parseFloat(req.body.latitude).toFixed(5))
            };

            newRescueData['rescueReadyToTake'] = req.body.rescueReadyToTake;

            dbController.updateRescueData(newRescueData, req.body.rescueId, (errrrr) => {

                dbController.getRescueData(req.body.rescueId, (resData) => {
                    console.log(resData)
                    if (resData['carAssigned'] !== undefined) {
                        console.log("RESPONSE SENT!")
                        dbController.getCarData(resData['carAssigned']['carId'], (carData) => {
                            return res.json({
                                carAssigned: resData['carAssigned'],
                                carLocation: carData['location']
                            });
                        })

                    } else {

                        return res.json({
                            none: "none"
                        });

                    }
                })
            });
        })


    } else {

        return res.sendStatus(403);
    }
    //res.sendStatus(200);
});







module.exports = app;