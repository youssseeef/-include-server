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
let approximateLocation = function approximatePoint(lat, lon) {
    //this should truncate the first 2 digits of a location.
}
module.exports = {
    distanceBetweenTwoPoints
}