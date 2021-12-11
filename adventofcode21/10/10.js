console.time('perf');
const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8')
    .trimEnd()
    .split('\n')
    .map(val => val.split(''));


const CHARS_INFO = [
    {
        openChar: '(',
        closeChar: ')',
        points: 3,
        finalPoints: 1,
    },
    {
        openChar: '[',
        closeChar: ']',
        points: 57,
        finalPoints: 2,
    },
    {
        openChar: '{',
        closeChar: '}',
        points: 1197,
        finalPoints: 3,
    },
    {
        openChar: '<',
        closeChar: '>',
        points: 25137,
        finalPoints: 4,
    },
];

const openingChars = [];
const mappedOpenChars = new Map();
const mappedCloseChars = new Map();
const mappedFinalPoints = new Map()
for (const char of CHARS_INFO) {
    openingChars.push(char.openChar);
    mappedOpenChars.set(char.closeChar, char.openChar);
    mappedCloseChars.set(char.openChar, char.closeChar);
    mappedFinalPoints.set(char.closeChar, char.finalPoints);
}

// Count corrupt and populate incomplete
let totalPart1 = 0;
const openLines = [];
for (const line of input) {
    const currOpen = [];
    let isValid = true;
    for (const char of line) {
        if (openingChars.includes(char)) {
            currOpen.push(char);
        } else if (mappedOpenChars.get(char) === currOpen[currOpen.length - 1]) {
            currOpen.pop();
        } else {
            totalPart1 += CHARS_INFO.find(c => c.closeChar === char).points;
            isValid = false;
            break;
        }
    }
    if (isValid) openLines.push(currOpen.reverse().map(c => mappedCloseChars.get(c)));
}


const finalPoints = openLines.reduce((acc, line) => {
    const currPoint = line.reduce((acc, char) => {
        acc *= 5;
        acc += mappedFinalPoints.get(char);
        return acc;
    }, 0);
    acc.push(currPoint);
    return acc;
}, []);

console.log({
    part1: totalPart1,
    part2: finalPoints.sort((a,b) => a > b ? 1 : -1)[Math.ceil((finalPoints.length / 2) - 1)],
});

console.timeEnd('perf');
