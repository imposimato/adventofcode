const fs = require('fs');

console.time('perf');

const input = fs.readFileSync('input.txt')
    .toString()
    .trimEnd()
    .split(',')
    .map(Number);

function growthInDays(input, days) {
    const fishDays = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    input.forEach(state => fishDays[state] += 1);
    for (let i = 0; i < days; i++) {
        const newborn = fishDays.shift();
        fishDays.push(newborn);
        fishDays[6] += newborn;
    }
    return fishDays.reduce((prev, cur) => prev + cur);
}

console.log(
    {
        'part1': growthInDays(input, 80),
        'part2': growthInDays(input, 256),
    },
);

console.timeEnd('perf');
