const fs = require('fs');

const input = fs.readFileSync('./09.txt')
    .toString()
    .trimEnd()
    .split("\n")
    .map(val => parseInt(val));

// Cast Array as obj to reduce bigO
function castToObj(inputs) {
    let tempObj = {};
    for (const value of inputs) {
        if (!tempObj[value]) {
            tempObj[value] = 1;
        }
        else {
            tempObj[value] += 1;
        }
    }
    return tempObj;
}

function findPair(values, target) {
    const object = castToObj(values);
    for (const v of values) {
        const diff = target - v;
        if (object[diff] && diff + v === target) {
            return true;
        }
    }
    return false;
}

function iterateArray(n, array) {
    for (let i = n; i < array.length; i++)
        if (!findPair(array.slice((i - n),i), array[i])) {
            return array[i];
    }
}

const firstAnswer = iterateArray(25, input);
console.log('First: ', firstAnswer);

function findSet(input, target) {
    for (let i = 0; i < input.length; i++) {
        let j = i;
        let currentSum = 0;
        while (j < input.length) {
            currentSum += input[j];
            if (currentSum === target && i !== j) {
                return input.slice(i, j+1);
            }
            if (currentSum > target) {
                break;
            }
            j++;
        }
    }
}
const subArr = findSet(input, firstAnswer).sort((a, b) => a-b);
console.log(subArr.reduce((acc, val) => acc + val) === firstAnswer);
console.log(subArr);
console.log(Math.max(...subArr) + Math.min(...subArr));
