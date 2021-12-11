const fs = require('fs');

const input = fs.readFileSync('./18.txt')
    .toString('utf-8')
    .trimEnd()
    .split('\n')
    .map(str =>
        str.replace(/\s+/g, '')
        .split(''));

function solvePrecedence(arr, precedence) {
    const result = [parseInt(arr[0])];
    for (let i = 1; i < arr.length; i += 2) {
        const val = parseInt(arr[i + 1]);
        if (arr[i] === "+") {
            result[0] += val;
        } else if (precedence) {
            result.unshift(val);
        } else {
            result[0] *= val;
        }
    }
    return result.reduce((a, b) => a * b);
}

function extractParentheses(arr, precedence) {
    if (arr.includes('(')) {
        const firstClose = arr.indexOf(')');
        const tempArr = arr.slice(0, firstClose);
        const newArrEnd = arr.slice(firstClose + 1);
        const split = tempArr.lastIndexOf('(');
        const newArray = [...arr.slice(0, split),
            solvePrecedence(tempArr.slice(split + 1, firstClose), precedence), ...newArrEnd];
        return extractParentheses(newArray, precedence);
    } else {
        return solvePrecedence(arr, precedence);
    }
}

function solvePartOne(array) {
    let sum = 0;
    array.forEach(elem => {
        sum += extractParentheses(elem, false);
    })
    return sum;
}

function solvePartTwo(array) {
    let sum = 0;
    array.forEach(elem => {
        sum += extractParentheses(elem, true);
    })
    return sum;
}

console.log(solvePartOne(input));
console.log(solvePartTwo(input));

