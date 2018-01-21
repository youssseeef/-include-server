var locationHelper = require('./locationHelpers');
// var apis = require('./../apis.js');
var request = require('request');
var gMapsApiKey = process.env.GMAPS_API_KEY | apis.mapsapi;
var googleMapsClient = require('@google/maps').createClient({
    key: gMapsApiKey
});
//The controller mainly interacts with Google Maps API
//The controller also uses helper function to take actions
//based on the distance between things and their location.
//This function takes the GPS location and callbacks the roadName to the caller.
function fetchRoadName(lat, lng, alt, callback) {
    googleMapsClient.geoCode()
}
//this function takes an array of ambulances/rescue cars and calculates the 
//time taken from each of them to the accident in the 2nd,3rd and 4th arguments
//and returns a single id to the caller.
//arr should contain carid + gps coordinates for each of the cars
function fetchFastestDistanceToAccident(arr, lng, lat, alt, callback) {

}