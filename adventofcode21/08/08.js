const fs = require('fs');

console.time('perf');

const input = fs.readFileSync('input.txt')
    .toString()
    .trimEnd()
    .split('\n');

let count = 0;
const uniqueSegments = [2, 3, 4, 7];

input.forEach(item => {
    item.split(' | ')
        .map(val => val.split(' '))[1].forEach(val => {
        if (uniqueSegments.includes(val.length)) count++;
    });
});


function getComplexity(str) {
    if (uniqueSegments.includes(str.length)) return 0;
    if (str.length === 6) return 1;
    if (str.length === 5) return 2;
}

function sortByComplexity(a, b) {
    return getComplexity(a) > getComplexity(b) ? 1 : -1
}

function shareSegments(str, model) {
    return model.split('').every(v => str.split('').includes(v));
}

function findSum(arr) {
    let totalSum = 0;
    arr.forEach(item => {
        const valuesIndex = [];
        const [mixed, values] = item.split(' | ').map(val => val.split(' '));
        // makes sure we're decoding the easiest ones first
        mixed.sort(sortByComplexity).forEach(str => {
            // sort the string to be easier to index in the array;
            const strTemp = str.split('').sort().join('');
            switch (str.length) {
                case 2:
                    valuesIndex[1] = strTemp;
                    break;
                case 3:
                    valuesIndex[7] = strTemp;
                    break;
                case 4:
                    valuesIndex[4] = strTemp;
                    break;
                case 7:
                    valuesIndex[8] = strTemp;
                    break;
                case 6:
                    if (shareSegments(str, valuesIndex[4])) {
                        valuesIndex[9] = strTemp;
                    } else if (shareSegments(str, valuesIndex[7])) {
                        valuesIndex[0] = strTemp;
                    } else {
                        valuesIndex[6] = strTemp;
                    }
                    break;
                case 5:
                    if (shareSegments(valuesIndex[6], str)) {
                        valuesIndex[5] = strTemp;
                    } else if (shareSegments(strTemp, valuesIndex[1])) {
                        valuesIndex[3] = strTemp;
                    } else {
                        valuesIndex[2] = strTemp;
                    }
                    break;
            }
        });
        let currentCode = '';
        values.forEach(val => {
            currentCode += '' + valuesIndex.indexOf(val.split('').sort().join(''));
        });
        totalSum += parseInt(currentCode);
    });
    return totalSum;
}

console.log({
    part1: count,
    part2: findSum(input),
});

console.timeEnd('perf');
