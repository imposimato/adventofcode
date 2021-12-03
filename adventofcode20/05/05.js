const fs = require('fs');

// B = 1 R = 1 F = 0 L = 0
const regex0 = /F|L/g
const regex1 = /B|R/g

const input = fs.readFileSync('./05.txt')
    .toString('utf-8')
    .split("\n")
    .filter(row => row)
    // convert the row in binary
    .map(row => row.replace(regex0, '0'))
    .map(row => row.replace(regex1, '1'))
    // parse Int the ID
    .map(row => parseInt(row, 2))
    .sort((a,b) => a-b);

// Part 1
console.log('Max Id: ', Math.max(...input));

// Part 2
for (let i = 1; i < input.length; i++) {
    if ((input[i] - input[i-1]) > 1) {
        console.log('Missing Ticket is: ', input[i] - 1);
        break;
    }
}
