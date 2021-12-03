const fs = require('fs');

const input = fs.readFileSync('./test.txt')
    .toString('utf-8')
    .split('\n')
    .filter(row => row.length)
    .map(row => row.split(' bags contain ')
        .map(innerRow => innerRow.split(/ bag[s]?[,|.][ ]?/)
            .filter(row => row.length)))
    .filter(row => !!row);

const bagObj = {};

input.forEach((bag) => {
    bagObj[bag[0]] = Object.fromEntries(bag[1].map(data => {
        const temp = data.split(/(?<=^\S+)\s/);
        return [temp[1], parseInt(temp[0])];
    }))
});

let count = 0;
const set = new Set();
function findBag(color) {
    for (const key in bagObj) {
        if (bagObj[key][color] && !set.has(key)) {
            set.add(color);
            count++;
            findBag(key);
        }
    }
}
findBag('shiny gold')
console.log(set);
