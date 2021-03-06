var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express();
var User = require("../models/user");
var MedicalUser = require("../models/medicalprofile");
var databaseController = require("../../database/database-controller");
router.post('/signup', function(req, res) {
    console.log(req.body.username)
    if (!req.body.username || !req.body.password || !req.body.userType) {
        res.json({ success: false, msg: 'Please pass username and password.' });
    } else {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password,
            userType: req.body.userType
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                return res.json({ success: false, msg: 'Username already exists.' });
            }
            res.json({ success: true, msg: 'Successful created new user.' });
        });
        if (req.body.userType == "medicalProfile" && req.body.hasOwnProperty('fullName')) {
            var newMedicalUser = new MedicalUser({
                username: req.body.username,
                fullName: req.body.fullName
            });
            newMedicalUser.save(function(err) {
                if (err) {
                    console.log(err)
                    return console.log({ success: false, msg: 'MedicalUser already exists.' });
                }
                return console.log({ success: true, msg: 'Successful created new Medical user.' });
            });
        }

    }
});

router.post('/signin', function(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.sign(user.toObject(), config.secret);
                    // return the information including token as JSON
                    res.json({ success: true, token: 'JWT ' + token, userType: user.userType });
                } else {
                    res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                }
            });
        }
    });
});
router.post('/validateToken', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.headers['authorization']);
    if (req.headers && req.headers.authorization) {
        let authorization = req.headers.authorization.split([' '])[1];
        try {
            return res.status(200).json({
                success: 'OK',
                userId: req.user['_id'],
                userType: req.user['userType']
            });
        } catch (e) {
            console.log(e);
            return res.status(401).send('unauthorized');
        }

    }
    return res.status(500);

});

/**
 * This endpoint is responsible to post the medical user data to their account.
 * the user should be using a token jwt.
 * The data gets passed as is to the database
 */
router.post('/postUserData', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.user.username === req.body.username);
    console.log(req.user.username);
    console.log(req.body.username);


    //this will
    /**
     * 1- Validate the user asscociated with the token.
     * 2- Validate the data types.
     * 3- post the data to mongodb to update the user's data.
     */
    if (req.user !== null && req.user.userType === "medicalProfile" && req.user.username === req.body.username) {
        console.log('Confused duckkk!!!')
        MedicalUser.findOne({ username: req.user.username }, function(err, userAnswer) {
            console.log('errors?' + err);
            console.log('userans' + userAnswer);

            console.log('got here!!!');
            let userMongooseId = userAnswer._id;
            MedicalUser.findById(userMongooseId, (err, userData) => {
                console.log(err);
                console.log('user_data' + userData)
                userData.fullName = req.body.fullName;
                userData.phoneNumber = req.body.phoneNumber;
                userData.emergencyContactName = req.body.emergencyContactName;
                userData.emergencyPhoneNumber = req.body.emergencyPhoneNumber;
                userData.birthYear = req.body.birthYear;
                userData.birthMonth = req.body.birthMonth;
                userData.birthDay = req.body.birthDay;
                userData.surgicalHistory = req.body.surgicalHistory;
                userData.currentMedications = req.body.currentMedications;
                userData.allergiesToDrugs = req.body.allergiesToDrugs;
                userData.bloodGroup = req.body.bloodGroup;
                userData.addict = req.body.addict;
                userData.smoker = req.body.smoker;
                userData.cancer = req.body.cancer;
                userData.chronicObstructive = req.body.chronicObstructive;
                userData.disease = req.body.disease;
                userData.clotticDisorder = req.body.clotticDisorder;
                userData.heartFailure = req.body.heartFailure;
                userData.diabetes = req.body.diabetes;
                userData.emhysema = req.body.emhysema;
                userData.hepatitis = req.body.hepatitis;
                userData.hyperTension = req.body.hyperTension;
                userData.myocardialInfraction = req.body.myocardialInfraction;
                userData.seizures = req.body.seizures;
                userData.strokes = req.body.strokes;
                userData.save(function(err) {
                    console.log(err)
                    if (err) {
                        return res.json({ success: false, msg: 'Error updating data.' });
                    }
                    res.json({ success: true, msg: 'Data successfully updated!' });
                });
            });
        });

        // var medUser = new MedicalUser({
        //     username: req.user.username,
        //     fullName: req.body.fullname,
        //     phoneNumber: req.body.phoneNumber,
        //     emergencyContactName: req.body.emergencyContactName,
        //     emergencyPhoneNumber: req.body.emergencyPhoneNumber,
        //     birthYear: req.body.birthYear,
        //     birthMonth: req.body.birthMonth,
        //     birthDay: req.body.birthDay,
        //     surgicalHistory: req.body.surgicalHistory,
        //     currentMedications: req.body.currentMedications,
        //     allergiesToDrugs: req.body.allergiesToDrugs,
        //     bloodGroup: req.body.bloodGroup,
        //     addict: req.body.addict,
        //     smoker: req.body.smoker,
        //     cancer: req.body.cancer,
        //     chronicObstructive: req.body.chronicObstructive,
        //     disease: req.body.disease,
        //     clotticDisorder: req.body.clotticDisorder,
        //     heartFailure: req.body.heartFailure,
        //     diabetes: req.body.diabetes,
        //     emhysema: req.body.emhysema,
        //     hepatitis: req.body.hepatitis,
        //     hyperTension: req.body.hyperTension,
        //     myocardialInfraction: req.body.myocardialInfraction,
        //     seizures: req.body.seizures,
        //     strokes: req.body.strokes
        // });
        // medUser.save(function(err) {
        //     if (err) {
        //         return res.json({ success: false, msg: 'Error updating data.' });
        //     }
        //     res.json({ success: true, msg: 'Data successfully updated!' });
        // });

    } else {
        res.json({ error: "invalid data.." })
    }
})


router.post('/carAddQR', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user !== null &&
        req.user.userType === "medicalProfile" &&
        req.user.username === req.body.username &&
        req.body.carId !== null) {

        databaseController.addMedicalUserToQR(req.body.username, req.body.carId, (err, answer) => {
            if (err) {
                return res.status(404).json({
                    error: err
                });
            }
            return res.json(answer);
        })
    } else {
        return res.status(404).json({
            error: "Check your request"
        })
    }
});
router.post('/getAmbulanceUsers', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user !== null && req.user.userType === "ambulance" && req.body.carId !== undefined) {
        databaseController.getMedicalUsersAssociatedWithCar(req.body.carId, (error, value) => {
            if (error) {
                return res.status(401).json({ error: 'Database error happened.' });
            }
            let finalValue = value.success;
            return res.json(finalValue);
        });
    } else {
        return res.status(401).json({ error: 'Not Authorized.' });
    }
});
router.post('/getAmbulanceUser', passport.authenticate('jwt', { session: false }), (req, res) => {
    //This will get the data associated with the current user associated with JWT
    //This should be using the user's unique id.
    //this will get all the data for the app to display when the user opens the view.
    //this will check if there's no data, we'll send some kind of empty response
    if (req.user !== null && req.user.userType === "ambulance") {
        MedicalUser.findOne({ username: req.body.username }, (error, answer) => {
            if (error) {
                res.json({
                    error: error
                });
            }
            if (answer === null) {
                res.json({
                    error: 'no user found'
                });
            } else {
                res.json({
                    answer: answer
                });
            }

        })
    }
});

router.post('/getUserData', passport.authenticate('jwt', { session: false }), (req, res) => {
    //This will get the data associated with the current user associated with JWT
    //This should be using the user's unique id.
    //this will get all the data for the app to display when the user opens the view.
    //this will check if there's no data, we'll send some kind of empty response
    if (req.user !== null && req.user.userType === "medicalProfile" && req.user.username === req.body.username) {
        MedicalUser.findOne({ username: req.body.username }, (error, answer) => {
            if (error) {
                res.json({
                    error: error
                });
            }
            if (answer === null) {
                res.json({
                    error: 'no user found'
                });
            } else {
                res.json({
                    answer: answer
                });
            }

        })
    }
})
getToken = function(headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};
module.exports = router;