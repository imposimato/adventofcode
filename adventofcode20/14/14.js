const fs = require('fs');

const input = fs.readFileSync('./14.txt')
    .toString('utf-8')
    .trimEnd()
    .split("\n");

function partOne(array) {
    let currentIndex = 0;
    let mem = [];
    let mask = '';
    array.forEach((line, index) => {
        if (line.includes('mask')) {
            currentIndex = index;
            mask = line.split('mask = ').join('');
        } else {
            let [memory, value] = line.split(' = ');
            memory = parseInt(memory.substring(4, memory.length - 1));
            let binary = parseInt(value).toString(2).padStart(36, '0');
            let currentValue = '';
            for (let i = 0; i < binary.length; i++) {
                mask[i] === 'X' ? currentValue += binary[i] : currentValue += mask[i];
            }
            mem[memory] = currentValue;
        }
    });

    console.log(mem.filter(v => v)
        .map(v => parseInt(v, 2))
        .reduce((acc, value) => acc + value));
}

function findCombinations(n) {
    const max = 2 ** n;
    const result = [];
    for (let i = 0; i < max; i++) {
        result.push(i.toString(2).padStart(n, '0'));
    }
    return result;
}

function partTwo(array) {
    let memory = new Map();
    let mask = null;
    let combinations = null;
    array.forEach((line) => {
        if (/^mask/.test(line)) {
            const {groups} = /^mask = (?<mask>.*)$/.exec(line);
            mask = [...groups.mask];
            combinations = findCombinations(mask.filter(x => x === 'X').length);
        } else {
            const {groups} = /^mem\[(?<address>\d+)\] = (?<value>\d+)$/.exec(line);
            let address = parseInt(groups.address);
            let binaryAddress = [...address.toString(2).padStart(36, '0')];
            let decimal = parseInt(groups.value);

            combinations.forEach((combination) => {
                let xPosition = 0;
                let a = mask.map((v, index) => {
                    if (v == 'X') {
                        return combination[xPosition++];
                    }
                    return parseInt(v) || parseInt(binaryAddress[index]);
                }).join('');
                let pointer = parseInt(a, 2);
                memory.set(pointer, decimal);
            })
        }

    });
    let result = 0;
    memory.forEach((v) => {
        result += v;
    })
    console.log(result);
}
partOne(input);
partTwo(input);

