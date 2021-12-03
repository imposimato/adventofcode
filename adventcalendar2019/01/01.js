const fs = require('fs');

const input = fs.readFileSync('./01.txt')
    .toString()
    .trimEnd()
    .split("\n")
    .map(val => parseInt(val));

console.log('Part One:', input.map(val => Math.floor(val / 3) - 2).reduce((acc, value) => acc + value));

function findValue(value) {
    let newValue = Math.floor(value / 3) - 2;
    if (newValue > 0) {
        return newValue + findValue(newValue);
    } else {
        return 0;
    }
}
let totalFuel = 0;
input.forEach(value => {
    totalFuel += findValue(value);
})

console.log('Part two:', totalFuel);
