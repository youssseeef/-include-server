var express = require('express');
//var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');
var bodyparser = require('body-parser');
mongoose.connect(config.database);
var api = require('./routes/api');
const app = express();
app.use(bodyparser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(passport.initialize());

app.get('/', function(req, res) {
    res.send('Page under construction.');
});

app.use('/api2', api);

app.listen(3000, () => console.log('Example app listening on port 3000!'))