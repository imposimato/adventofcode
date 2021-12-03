const fs = require('fs');

const input = fs.readFileSync('./10.txt')
    .toString()
    .trimEnd()
    .split("\n")
    .map(val => parseInt(val))
    .sort((a, b)=> a - b);

input.unshift(0);
input.push(Math.max(...input) + 3);

const diffArr = [, 0, 0, 0];
for(let i = 1; i < input.length; i++) {
    ++diffArr[input[i] - input[i-1]];
}
console.log(diffArr[1] * diffArr[3]);

function traverse(array, memo = {}) {
    let res = 1;
    const key = array.join(',');
    if (key in memo) {
        return memo[key];
    }
    for (let i = 1; i < array.length-1; i++) {
        if (array[i+1] - array[i - 1] <= 3) {
            const arr2 = [array[i-1]].concat(array.slice(i+1));
            res += traverse(arr2, memo);
        }
    }
    memo[key] = res;
    return res;
}

console.log(traverse(input, {}));
