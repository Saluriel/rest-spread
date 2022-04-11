function filterOutOdds(...nums) {
    return nums.filter((num) => num % 2 === 0);
};


function findMin(...nums) {
    return nums.reduce((min, currVal) => {
        return min < currVal ? min : currVal;
    })
}

const mergeObjects = (obj1, obj2) => ({ ...obj1, ...obj2 })

const doubleAndReturnArgs = (arr, ...args) => [...arr, ...args.map((value) => value * 2)]

/** remove a random element in the items array
and return a new array without that item. */

const removeRandom = (items) => {
    //generate a random index number to remove
    let i = Math.floor(Math.random() * items.length);
    //slice the items array at 0 up to the random index, and then slice again right after the random index
    return [...items.slice(0, idx), ...items.slice(idx + 1)];
}

/** Return a new array with every item in array1 and array2. */

const extend = (array1, array2) => {
    return [...array1, ...array2];
}


/** Return a new object with all the keys and values
from obj and a new key/value pair */

const addKeyVal = (obj, key, val) => {
    return { ...obj, [key]: val };
}


/** Return a new object with a key removed. */

const removeKey = (obj, key) => {
    let newObj = { ...obj };
    delete newObj[key];
    return newObj;
}

/** Combine two objects and return a new object. */

const combine = (obj1, obj2) => {
    let newObj = { ...obj1, ...obj2 };
    return newObj;
}


/** Return a new object with a modified key and value. */

const update = (obj, key, val) => {
    let newObj = { ...obj, [key]: val };
    return newObj;

}