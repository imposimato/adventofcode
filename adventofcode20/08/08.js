const fs = require('fs');

const input = fs.readFileSync('./08.txt')
    .toString('utf-8')
    .trimEnd()
    .split('\n');

const instructionPattern = /^(jmp|acc|nop)\s([+|-]\d+)$/;

let visitedObj = {};
let accumulator = 0;

// Rule takes current index and returns the next one
function moveIndex(instructions, index, value, acc) {
    switch (instructions) {
        case 'nop':
            return index + 1;
        case 'jmp':
            return index + parseInt(value);
        case 'acc':
            accumulator += parseInt(value);
            return index + 1;
    }
}

let i = 0;
let previousI = 0;
while (!visitedObj[i]) {
    const [nValue, instr, val] = input[i].match(instructionPattern);
    visitedObj = {...visitedObj, [i]: true};
    previousI = i;
    i = moveIndex(instr, i, val);
}

console.log(accumulator);

