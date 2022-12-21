// https://www.codewars.com/kata/54bf1c2cd5b56cc47f0007a1/train/javascript

function duplicateCount(text) {
    if (text.length === 0) return 0

    const string = text.toLowerCase();
    const map = {};
    let count = 0;

    for (let i = 0; i < string.length; i++) {
        const letter = string[i];
        if (!map[letter]) {
            map[letter] = 1;
        } else if (map[letter] < 2) {
            map[letter] += 1;
            count++
        }
    }

    return count

}


// tests
console.log(duplicateCount(""))//  0
console.log(duplicateCount("abcde")) //  0
console.log(duplicateCount("aabbcde")) // 2
console.log(duplicateCount("aabBcde")) // 2 "should ignore case"
console.log(duplicateCount("Indivisibility")) // 1
console.log(duplicateCount("Indivisibilities")) // 2, "characters may not be adjacent"
