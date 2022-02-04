function isWhich(min, max) {
    return function(num) {
        return num > min && num <= max;
    }
}
const isChiled = isWhich(0, 18);
const isAdult = isWhich(18, 60);
const isElder = isWhich(60, 100);