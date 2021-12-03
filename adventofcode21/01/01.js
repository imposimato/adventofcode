const fs = require('fs');

const array = fs.readFileSync('input.txt')
    .toString()
    .split("\n")
    .filter(row => row)
    .map(val => parseInt(val));

function part1(arr) {
    let count = 0;
    arr.forEach((val, i) => {
        if (i > 0 && arr[i-1] < arr[i]) count++;
    });
    return count;
}

function part2(arr) {
    let tempArr = [];
    arr.forEach((val, i) => {
        tempArr.push((val + (arr[i + 1] || 0) + (arr[i + 2] || 0)));
    });
    return part1(tempArr);
}

console.log(part1(array));
console.log(part2(array));

