const fs = require('fs');

const input = fs.readFileSync('./13.txt')
    .toString('utf-8')
    .split("\n");

let [time, buses] = input;
time = parseInt(time);

buses = buses.split(',').filter(bus => bus !== 'x').map(bus => parseInt(bus));
let diffs = [];
buses.forEach(bus => {
    const factor = Math.ceil(time / bus);
    if (!diffs[0] || diffs[0] > factor * bus - time) {
        diffs = [factor * bus - time, bus];
    }
})
console.log('Part One:', diffs[0] * diffs[1]);

const schedule = input[1].split(',')
    .map((n, i) => [parseInt(n, 10), i])
    .filter(([n]) => !Number.isNaN(n));

let multiplier = schedule[0][0];
let t = 0;

schedule.slice(1).forEach(([bus, busIndex]) => {
    while (true) {
        if ((t + busIndex) % bus === 0) {
            multiplier *= bus;
            break;
        }
        t += multiplier;
    }
});

console.log('Part two:', t);
