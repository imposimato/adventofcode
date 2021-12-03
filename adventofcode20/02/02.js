const fs = require('fs');

const pattern = /(?<pos1>\d+)-(?<pos2>\d+) (?<key>\w): (?<pass>\w+)/;

const input = fs.readFileSync('./02.txt')
    .toString('utf-8')
    .split("\n")
    .filter(row => row)
    .map(row => pattern.exec(row).groups)

const correctPasswordsPolicy1 = input.filter((record) => {
    console.log(record.pass.split(record.key));
    const charCount = record.pass.split(record.key).length -1;
    return charCount >= record.pos1 && charCount <= record.pos2;
});

const correctPasswordsPolicy2 = input.filter((record) =>
    record.pass[record.pos1 - 1] === record.key ^
    record.pass[record.pos2 - 1] === record.key
);

console.log(correctPasswordsPolicy1.length);
console.log(correctPasswordsPolicy2.length);
