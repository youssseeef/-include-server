let distanceBetweenTwoPoints = function distanceBetweenTwoPoints(p1, p2) {
        lat1 = p1.lat;
        lat2 = p2.lat;
        lon1 = p1.lon;
        lon2 = p2.lon;
        //add error handling for null points//invalid data.
        var R = 6371e3; // earth radius
        var φ1 = lat1.toRadians();
        var φ2 = lat2.toRadians();

        var Δφ = (lat2 - lat1).toRadians();
        var Δλ = (lon2 - lon1).toRadians();
        //formula to calculate the distance
        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }
    //https://gis.stackexchange.com/questions/8650/measuring-accuracy-of-latitude-and-longitude

let approximateLocation = function approximatePoint(lat, lon) {
    //this should truncate location to  second decimal place. 1.1KM
    let lat_truncated = parseFloat(Math.round(lat).toFixed(2));
    let long_truncated = parseFloat(Math.round(long).toFixed(2));

    return {
        lat: lat_truncated,
        lon: long_truncated
    }

};
//thanks to the awesome stackoverflow user!
//Approximation: Could use the Google Maps API but it's rate limited
//and will require some credit-card now for billing which isn't available for me

function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
    return Value * Math.PI / 180;
}

module.exports = {
    distanceBetweenTwoPoints,
    approximateLocation,
    calcCrow
}