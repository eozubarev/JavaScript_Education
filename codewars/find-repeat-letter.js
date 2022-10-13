// findRepeatLetter("Привет Мир!", "р") "Привет Мир!" // output => 2

function howMatchRepeatLetter(str) {

    let mapCount = {};
    let strToLowCase = str.toLowerCase();

    for (let i = 0; i < strToLowCase.length; i++) {
        const letter = strToLowCase[i];
        if (mapCount[letter]) {
            mapCount[letter] = mapCount[letter] + 1;
        } else {
            mapCount[letter] = 1;
        }
    }

    return mapCount;

}
