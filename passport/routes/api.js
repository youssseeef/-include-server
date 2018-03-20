var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express();
var User = require("../models/user");

router.post('/signup', function(req, res) {
    console.log(req.body.username)
    if (!req.body.username || !req.body.password || !req.body.userType) {
        res.json({ success: false, msg: 'Please pass username and password.' });
    } else {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password,
            type: req.body.userType
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                return res.json({ success: false, msg: 'Username already exists.' });
            }
            res.json({ success: true, msg: 'Successful created new user.' });
        });
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
                    res.json({ success: true, token: 'JWT ' + token });
                } else {
                    res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                }
            });
        }
    });
});
router.post('/validateToken', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.sendStatus(200).json({
        success: 'true'
    })
});
router.post('postUserData', passport.authenticate('jwt', { session: false }), (req, res) => {
    //this will
    /**
     * 1- Validate the user asscociated with the token.
     * 2- Validate the data types.
     * 3- post the data to mongodb to update the user's data.
     */
})
router.post('getUserData', passport.authenticate('jwt', { session: false }), (req, res) => {
    //This will get the data associated with the current user associated with JWT
    //This should be using the user's unique id.
    //this will get all the data for the app to display when the user opens the view.
    //this will check if there's no data, we'll send some kind of empty response
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