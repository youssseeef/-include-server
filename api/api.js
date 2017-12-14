//This file should contain the main API endpoints of the app
// @author Youssseeef
const express = require('express');
const app = express();
//Fordbidden access - no get requests 
app.get('/**', (req, res) => {
    res.sendStatus(403);
});
app.post('/api/', (req, res) => {
    res.sendStatus(403);
});
app.post('/api/cars/request', (req, res) => {
    res.sendStatus(200);
});
app.post('/api/cars/update', (req, res) => {
    res.sendStatus(200);
});
app.post('/api/sos/rescue', (req, res) => {
    res.sendStatus(200);
});
app.post('/api/sos/ambulance', (req, res) => {
    res.sendStatus(200);
});

module.exports = app;