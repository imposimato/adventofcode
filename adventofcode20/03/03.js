const fs = require('fs');

const input = fs.readFileSync('./03.txt')
    .toString('utf-8')
    .split("\n")
    .filter(row => row);

function findNumberOfTrees(right, down, values) {
    let count = 0;
    for (let i = 0, j = 0; i < values.length; i += down, j += right) {
        if (j >= values[i].length) j = j % values[i].length;
        if (values[i][j] === '#') count++;
    }
    return count;
}
// Part 1
console.log(findNumberOfTrees(3, 1, input));

// Part 2
const slopes = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
];
let multiplication = 1;
slopes.forEach(slope =>
    multiplication *= findNumberOfTrees(slope.right, slope.down, input));

console.log(multiplication);
