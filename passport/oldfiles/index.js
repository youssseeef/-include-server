const express = require('express');
var mongoose = require('mongoose');

//Setting up database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/car-users-auth')
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));

//passport

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
let User = require('./models/User');


passport.use(new LocalStrategy(
    (username, password, done) => {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect Username' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        })

    }
));
//express app
const app = express()

app.use(passport.initialize());




app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))