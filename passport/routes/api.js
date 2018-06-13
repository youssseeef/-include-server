var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express();
var User = require("../models/user");
var MedicalUser = require("../models/medicalprofile");
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
                fullname: req.body.fullname
            });
            newMedicalUser.save(function(err) {
                if (err) {
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
    //this will
    /**
     * 1- Validate the user asscociated with the token.
     * 2- Validate the data types.
     * 3- post the data to mongodb to update the user's data.
     */
    if (req.user !== null && req.user.userType === "medicalProfile" && req.user.username === req.body.username) {
        var medUser = new MedicalUser({
            username: req.user.username,
            fullName: req.body.fullname,
            phoneNumber: req.body.phoneNumber,
            emergencyContactName: req.body.emergencyContactName,
            emergencyPhoneNumber: req.body.emergencyPhoneNumber,
            birthYear: req.body.birthYear,
            birthMonth: req.body.birthMonth,
            birthDay: req.body.birthDay,
            surgicalHistory: req.body.surgicalHistory,
            currentMedications: req.body.currentMedications,
            allergiesToDrugs: req.body.allergiesToDrugs,
            bloodGroup: req.body.bloodGroup,
            addict: req.body.addict,
            smoker: req.body.smoker,
            cancer: req.body.cancer,
            chronicObstructive: req.body.chronicObstructive,
            disease: req.body.disease,
            clotticDisorder: req.body.clotticDisorder,
            heartFailure: req.body.heartFailure,
            diabetes: req.body.diabetes,
            emhysema: req.body.emhysema,
            hepatitis: req.body.hepatitis,
            hyperTension: req.body.hyperTension,
            myocardialInfraction: req.body.myocardialInfraction,
            seizures: req.body.seizures,
            strokes: req.body.strokes
        });
        medUser.save(function(err) {
            if (err) {
                return res.json({ success: false, msg: 'Error updating data.' });
            }
            res.json({ success: true, msg: 'Data successfully updated!' });
        });

    } else {
        res.json({ error: "invalid data.." })
    }
})
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