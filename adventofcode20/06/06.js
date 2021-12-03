const fs = require('fs');

const input = fs.readFileSync('./06.txt')
    .toString('utf-8')
    .split('\n\n')
    .filter(row => !!row);

// Part 1
const input1 = input.map(row => row.split('\n').join(''));

let totalCountsPart1 = [];
for (const form of input1) {
    const tempObj = {};
    let countPerGroup = 0;
    for (const a of form) {
        if (!tempObj[a]) {
            countPerGroup++;
            tempObj[a] = 1;
        }
    }
    totalCountsPart1.push(countPerGroup);
}
console.log('Part 1: ', totalCountsPart1.reduce((acc, current) => acc + current));


// Part 2
const input2 = input.map(row => row.split('\n').filter(row => row.length));

let totalCountsPart2 = [];
for (const form of input2) {
    const tempObj = {};
    let countPerGroup = 0;
    for (const person of form) {
        for (const a of person) {
            if (!tempObj[a]) {
                tempObj[a] = 1;
            } else {
                tempObj[a] += 1;
            }
        }
    }
    for (const key in tempObj) {
        if (tempObj[key] === form.length) countPerGroup++;
    }
    totalCountsPart2.push(countPerGroup);
}
console.log('Part 2: ', totalCountsPart2.reduce((acc, current) => acc + current));

