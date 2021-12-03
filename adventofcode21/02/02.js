const fs = require('fs');

let forward = 0;
let depth = 0;
fs.readFileSync('input.txt')
    .toString()
    .split("\n")
    .filter(row => row)
    .map(val => {
        const x = val.split(' ');
        if (x[0] === 'forward') forward += parseInt(x[1]);
        if (x[0] === 'down') depth += parseInt(x[1]);
        if (x[0] === 'up') depth -= parseInt(x[1]);
    });

console.log(forward*depth);

forward = 0;
depth = 0;
let aim = 0;
fs.readFileSync('input.txt')
    .toString()
    .split("\n")
    .filter(row => row)
    .map(val => {
        const x = val.split(' ');
        if (x[0] === 'forward') {
            forward += parseInt(x[1]);
            depth += aim * parseInt(x[1]);
        }
        if (x[0] === 'down') {
            aim += parseInt(x[1]);
        }
        if (x[0] === 'up') {
            aim -= parseInt(x[1]);
        }
    });

console.log(forward*depth);

