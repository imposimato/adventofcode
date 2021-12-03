const fs = require('fs');

const heightPatt = /(?<val>\d+)(?<unit>[in|cm]\w)/;
const allKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

const passports = fs.readFileSync('./04.txt')
    .toString('utf-8')
    .split('\n\n')
    .map(raw => raw.split(/\s/))
    .map(arr => Object.fromEntries(arr.map(data => data.split(":"))));

function validateHeight(h) {
    const heightObj = heightPatt.exec(h)?.groups;
    if (!heightObj) return false;
    const height = parseInt(heightObj.val);
    const unit = heightObj.unit;
    if (unit === 'in') return height >= 59 && height <= 76;
    if (unit === 'cm') return height >= 150 && height <= 193;
    return false;
}
//
function validatePassport(obj) {
    if (parseInt(obj.byr) < 1920 || parseInt(obj.byr) > 2002) return false;
    if (parseInt(obj.iyr) < 2010 || parseInt(obj.iyr) > 2020) return false;
    if (parseInt(obj.eyr) < 2020 || parseInt(obj.eyr) > 2030) return false;
    if (!obj.hcl.match(/#[0-9a-f]{6}/)) return false;
    if (!obj.ecl.match(/amb|blu|brn|gry|grn|hzl|oth/)) return false;
    if (!obj.pid.match(/^\d{9}$/)) return false;
    return validateHeight(obj.hgt);
}
///^\d{9}$/
let countPart1 = 0;
let countPart2 = 0;
passports.forEach(passport => {
    allKeys.every(item => passport.hasOwnProperty(item)) && countPart1++;
    allKeys.every(item => passport.hasOwnProperty(item)) && validatePassport(passport) && countPart2++;
});

console.log(`Part 1: ${countPart1}`);
console.log(`Part 2: ${countPart2}`);
