var locationHelper = require('./locationHelpers');
//debug
//var apis = require('./../apis.js');
var request = require('request');
var gMapsApiKey = process.env.GMAPS_API_KEY || apis.mapsapi;
var googleMapsClient = require('@google/maps').createClient({
    key: gMapsApiKey
});
//The controller mainly interacts with Google Maps API
//The controller also uses helper function to take actions
//based on the distance between things and their location.
//This function takes the GPS location and callbacks the roadName to the caller.
function fetchLocationId(lat, lng, alt, callback) {
    location = {
        points: [{
            lat: lat,
            lng: lng
        }]

    }
    googleMapsClient.nearestRoads(location, (error, response) => {
        placeId = response.json.snappedPoints[0].placeId;
        placeObject = {
            placeid: placeId,
            language: 'EN'
        }
        setTimeout(() => {
            googleMapsClient.place(placeObject, (err, resp2) => {
                callback(resp2.json.result['formatted_address']);
            })
        }, 5);

        //callback();
    });
}
//this function takes an array of ambulances/rescue cars and calculates the 
//time taken from each of them to the accident in the 2nd,3rd and 4th arguments
//and returns a single id to the caller.
//arr should contain carid + gps coordinates for each of the cars
function fetchFastestDistanceToAccident(arr, lng, lat, alt, callback) {
    let distance = 9999999999999;
    let closestRescueAmbulanceId = '';
    arr.forEach(element => {
        distance_new = locationHelper.distanceBetweenTwoPoints({
            lon: element.location.lng,
            lat: element.location.lat
        }, {
            lon: lng,
            lat: lat
        });
        if (distance_new < distance) {
            distance = distance_new;
        }
    });
}

function runTests() {
    fetchLocationId(31.43869620, 31.59002780, 3.0000000, (roadName) => {
        console.log(roadName);
    })
    fetchLocationId(31.439186, 31.5947697, 3.0000000, (roadName) => {
        console.log(roadName);
    })

    //far awayy
    fetchLocationId(31.439543, 31.6017117, 1.0000000, (roadName) => {
        console.log(roadName);
    })
}
runTests();
module.exports = {
    fetchLocationId,
    fetchFastestDistanceToAccident
}