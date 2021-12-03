const fs = require('fs');

const input = fs.readFileSync('./test.txt')
    .toString('utf-8')
    .trimEnd()
    .split('\n\n');

let [rulesRaw, valuesRaw] = input;
const messages = valuesRaw.split('\n');
rulesRaw = rulesRaw.split('\n');
const rules = {};

rulesRaw.forEach(r => {
    r = r.split(': ');
    if (r[1].match(/[ab]/)) {
        rules[r[0]] = r[1].substring(1, 2);
    } else {
        const values = r[1].split(' | ').map(v => v.split(' ').map(Number));
        rules[r[0]] = values;
    }
});

function findRule(n) {
    if (rules[n] === 'a' || rules[n] === 'b') {
        return rules[n];
    } else {
        let temp = ''
        for (let i = 0; i < rules[n].length; i++) {
            for (let j = 0; j < rules[0]; j++) {
                temp += findRule(rules[n][i][j])
            }
            temp += '|';
        }
        return temp;
    }
}

let result = '';
rules[0].forEach(elem => {
    elem.forEach(i => {
        result += findRule(i);
    })
})

console.log(result)

