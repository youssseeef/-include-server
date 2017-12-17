function timeStampGenerator() {
    return +new Date;
}

function accidentOccured() {

}

function runTests() {
    console.log(timeStampGenerator());
    console.log(typeof timeStampGenerator() == 'number' ? 'ASSERTED' : 'FAILELD');
}
runTests();
module.exports = {
    timeStampGenerator
}