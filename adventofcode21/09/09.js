const fs = require('fs');

console.time('perf');

const input = fs.readFileSync('input.txt')
    .toString()
    .trimEnd()
    .split('\n')
    .map(val => val.split('').map(Number));


function explore(i, j, map) {
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    for (const direction of directions) {
        const newI = i + direction[0];
        const newJ = j + direction[1];
        if (newI < 0 || newI >= input.length ||
            !input[newI][newJ] || input[newI][newJ] === 9 ||
            map.get(newI + ',' + newJ)) continue;
        map.set(newI + ',' + newJ, 1);
        explore(newI, newJ, map);
    }
}

let totalRisk = 0;
const countBasin = [];

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        const coords = [];
        if (i > 0) coords.push(input[i - 1][j]);
        if (j > 0) coords.push(input[i][j - 1]);
        if (j < input[i].length - 1) coords.push(input[i][j + 1]);
        if (i < input.length - 1) coords.push(input[i + 1][j]);
        if (Math.min(...coords) > input[i][j]) {
            totalRisk += input[i][j] + 1;
            const map = new Map();
            map.set(i + ',' + j, 1);
            explore(i, j, map);
            countBasin.push(Array.from(map.values()).length);
        }
    }
}

console.log({
    part1: totalRisk,
    part2: countBasin.sort((a,b) => a < b ? 1 : -1).slice(0, 3).reduce((prev, curr) => prev * curr),
});

console.timeEnd('perf');
