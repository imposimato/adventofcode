const fs = require('fs');
const _ = require('lodash');

console.time('perf');


const array = fs.readFileSync('input.txt')
    .toString()
    .trimEnd()
    .split('\n');

const nums = array[0].split(",").map(Number);
const boards = [];
const rawBoards = array.slice(2).join("\n").split("\n\n");

for (const rawBoard of rawBoards) {
    const rows = rawBoard
        .split("\n")
        .map((row) => row.trim().split(/\s+/).map(val => parseInt(val)));
    const cols = _.unzip(rows); // transposes 2d arrays
    const lines = rows.concat(cols); // all the directions that can win

    boards.push({ rows, lines, roundsPlayed: 0 });
}

for (const board of boards) {
    for (const num of nums) {
        for (const line of board.lines) {
            _.remove(line, (n) => n === num);
        }

        for (const row of board.rows) {
            _.remove(row, (n) => n === num);
        }

        board.roundsPlayed++;
        const isBingo = board.lines.some((remaining) => !remaining.length);

        if (isBingo) {
            const unusedSum = _.sum(board.rows.flat());
            board.score = unusedSum * num;
            break;
        }
    }
}

boards.sort((a, b) => a.roundsPlayed - b.roundsPlayed);

console.log('Part 1', boards[0].score);
console.log('Part 2', boards[boards.length - 1].score);

console.timeEnd('perf');



