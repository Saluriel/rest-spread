//#1
//{1,2,3,4}

//2
//{ref}

//3
//0: {Array(3) => true}
//1: {Array(3) => false}

//hasDuplicate
// function hasDuplicate(arr) {
//     let noDupes = new Set(arr);
//     if (noDupes.size !== arr.length) {
//         return true;
//     } else return false;
// }

const hasDuplicate = (arr) => new Set(arr).size !== arr.length;

//vowelCount
function isVowel(letter) {
    return 'aeiou'.includes(letter);
};

function vowelCount(str) {
    const vMap = new Map();
    for (let letter of str) {
        let lowercase = letter.toLowerCase();
        if (isVowel(lowercase)) {
            if (vMap.has(lowercase)) {
                vMap.set(lowercase, vMap.get(lowercase) + 1);
            } else {
                vMap.set(lowercase, 1)
            }
        }

    }
    return vMap;
}
