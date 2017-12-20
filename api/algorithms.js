function timeStampGenerator() {
    return +new Date;
}

function accidentOccured(affectedCarId, affectedCarLocation, affectedCarRoad) {

}

function runTests() {
    console.log(timeStampGenerator());
    console.log(typeof timeStampGenerator() == 'number' ? 'ASSERTED' : 'FAILELD');
}
runTests();
module.exports = {
    timeStampGenerator
}