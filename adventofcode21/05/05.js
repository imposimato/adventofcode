const fs = require('fs');

console.time('perf');

const coordinates = fs.readFileSync('input.txt')
    .toString()
    .trimEnd()
    .split('\n')
    .map(item => item.split(' -> ')
        .map(x => x.split(',').map(Number)));

const finalMap = new Map();

function addPoint(key) {
    const element = finalMap.get(key);
    if (!element) {
        finalMap.set(key, 1);
    } else {
        finalMap.set(key, element + 1);
    }
}

function populateHorizontalMap(x1, x2, y1, y2) {
    let xStart = x1 >= x2 ? x2 : x1;
    const xEnd = x1 <= x2 ? x2 : x1;
    for (xStart; xStart <= xEnd; xStart++) {
        addPoint([xStart, y1].join(','));
    }
}

function populateVerticalMap(x1, x2, y1, y2) {
    const yStart = y1 >= y2 ? y2 : y1;
    const yEnd = y1 <= y2 ? y2 : y1;
    for (let i = yStart; i <= yEnd; i++) {
        addPoint([x1, i].join(','));
    }
}

function populateDiagonal(x1, x2, y1, y2) {
    const xIncrement = x1 < x2 ? 1 : -1;
    const yIncrement = y1 < y2 ? 1 : -1;
    for (x1; true; x1 += xIncrement) {
        const key = [x1, y1].join(',');
        const element = finalMap.get(key);
        if (!element) {
            finalMap.set(key, 1)
        } else {
            finalMap.set(key, element + 1);
        }
        y1 += yIncrement;
        if (x1 === x2) break;
    }
}

for (const coord of coordinates) {
    const x1 = coord[0][0];
    const x2 = coord[1][0];
    const y1 = coord[0][1];
    const y2 = coord[1][1];
    if (x1 === x2) populateVerticalMap(x1, x2, y1, y2);
    else if (y1 === y2) populateHorizontalMap(x1, x2, y1, y2);
    else populateDiagonal(x1, x2, y1, y2);
}

const iterator = finalMap.values();
let count = 0;
for (const i of iterator) {
    if (i > 1) count++;
}
console.log(count);

console.timeEnd('perf');
