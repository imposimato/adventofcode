const fs = require('fs');
const _ = require('lodash');

console.time('perf');

const input = fs.readFileSync('input.txt')
    .toString()
    .trimEnd()
    .split(',')
    .map(Number);

function median(arr) {
    const mid = Math.floor(arr.length / 2);
    const nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

function findDeviation(arr) {
    const med = median(arr);
    let dev = 0;
    for (const item of arr) {
        dev += Math.abs(item - med);
    }
    return dev;
}

function part2(arr) {
    const mean = Math.round(_.sum(arr) / arr.length);

    let totalFuel1 = 0;
    let totalFuel2 = 0;
    let totalFuel3 = 0;
    for (const item of arr) {
        // The least amount will be close to the mean
        // Therefore I'm checking values close to the mean
        const dev1 = Math.abs(item - mean);
        const dev2 = Math.abs(item - mean + 1);
        const dev3 = Math.abs(item - mean - 1);
        totalFuel1 += _.sum(Array.from(Array(dev1 + 1).keys()));
        totalFuel2 += _.sum(Array.from(Array(dev2 + 1).keys()));
        totalFuel3 += _.sum(Array.from(Array(dev3 + 1).keys()));
    }
    return Math.min(totalFuel1, totalFuel2, totalFuel3);
}

console.log({
    part1: findDeviation(input),
    part2: part2(input),
});

console.timeEnd('perf');
