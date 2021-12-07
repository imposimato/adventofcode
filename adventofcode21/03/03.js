const fs = require('fs');

console.time('perf');

const array = fs.readFileSync('input.txt')
    .toString()
    .trimEnd()
    .split('\n');

//Traversing the array to group the digits in a string
function generateObject(arr) {
    const obj = {};
    arr.forEach((val) => {
        [...val].forEach((val, i) => {
            if (!obj[i]) obj[i] = '';
            obj[i] += val;
        });
    });
    return obj;
}

// Returns an array with most least frequent
function findFrequency(arr) {
    let gamma = '';
    let epsilon = '';
    let count = 0;
    const object = generateObject(arr);
    for (const item in object) {
        [...object[item]].forEach((val, i) => {
            if (val === '1') count++;
        });
        gamma += count >= Math.floor(object[item].length) / 2 ? '1' : '0';
        epsilon += count < Math.floor(object[item].length) / 2 ? '1' : '0';
        count = 0;
    }
    return [gamma, epsilon];
}

const [gamma, epsilon] = findFrequency(array);
console.log({
    part1: parseInt(gamma, 2) * parseInt(epsilon, 2)
});

// Recursively finds the single value
function findLifeSupport(string, arr, mostCommon) {
    if (arr.length === 1) return arr[0];
    const index = arr[0].length - string.length;
    arr = arr.filter(item => item.charAt(index) === string[0]);
    return findLifeSupport(findFrequency(arr)[+!mostCommon].substr(index + 1), arr, mostCommon);
}

console.log({
    part2: parseInt(findLifeSupport(gamma, [...array], true), 2) * parseInt(findLifeSupport(epsilon, [...array], false), 2)
});

console.timeEnd('perf');
