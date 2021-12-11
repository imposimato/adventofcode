console.time('perf');
const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('input.txt', 'utf8')
    .trimEnd()
    .split('\n')
    .map(val => val.split('')
        .map(Number));

function increaseAdjacent(i, j) {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1],
    ];
    directions.forEach(dir => {
        if (i + dir[0] >= 0
            && i + dir[0] < input.length
            && input[i + dir[0]][j + dir[1]] >= 0) {
            input[i + dir[0]][j + dir[1]]++
        }
    });
}

function leftToShine(map) {
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] > 9 && !map.get(`${i},${j}`)) return true;
        }
    }
    return false;
}

function countFlashes(map) {
    input.forEach((line, i) => {
        line.forEach((oct, j) => {
            if (oct > 9 && !map.get(`${i},${j}`)) {
                input[i][j] = 0;
                increaseAdjacent(i, j, map);
                map.set(`${i},${j}`, 1);
            }
        });
    });
    if (leftToShine(map)) countFlashes(map);
}

function setFlashedToZero(arr) {
    arr.forEach(coord => {
        const c = coord.split(',').map(Number);
        input[c[0]][c[1]] = 0;
    })
}

function runSteps(steps) {
    let flashes = 0;
    for (let i = 0; i < steps; i++) {
        const map = new Map();
        input.forEach((line, i) => {
            line.forEach((oct, j) => {
                input[i][j]++;
            });
        });
        countFlashes(map);
        const flashesArr = Array.from(map.keys());
        setFlashedToZero(flashesArr);
        flashes += flashesArr.length;
    }
    return flashes;
}

function findSync() {
    const size = _.flatten(input).length;
    let flashesArr = [];
    let count = 0;
    while (size !== flashesArr.length) {
        const map = new Map();
        input.forEach((line, i) => {
            line.forEach((oct, j) => {
                input[i][j]++;
            });
        });
        countFlashes(map);
        flashesArr = Array.from(map.keys());
        setFlashedToZero(flashesArr);
        count++;
    }
    return count;
}

console.log({
    part1: runSteps(100),
    part2: findSync(),
});

console.timeEnd('perf');
