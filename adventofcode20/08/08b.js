const fs = require('fs');

const input = fs.readFileSync('./08.txt')
    .toString('utf-8')
    .trimEnd()
    .split('\n');

const instructionPattern = /^(jmp|acc|nop)\s([+|-]\d+)$/;

let visited = {};
let accumulator = 0;
const instrStack = [];

const inverseInst = {
    nop: 'jmp',
    jmp: 'nop'
}
// Rule takes current index and returns the next offset
const rules = {
    acc: (val) => {
        accumulator += val;
        return 1;
    },
    nop: () => 1,
    jmp: (val) => val,
};

let i = 0;
while (i < input.length) {
    if (visited[i]) {
        const { acc, index } = instrStack.shift();
        accumulator = acc;

        const [, instr, val] = input[index].match(instructionPattern);

        i = index + rules[inverseInst[instr]](Number(val));
    } else {
        const [, instr, val] = input[i].match(instructionPattern);
        if (instr !== 'acc') {
            instrStack.push({ index: i, acc: accumulator });
        }
        visited = { ...visited, [i]: true };
        i += rules[instr](Number(val));
    }
}

console.log(accumulator);
