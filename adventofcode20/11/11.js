const fs = require('fs');

const input = fs.readFileSync('./11.txt')
    .toString()
    .trimEnd()
    .split('\n')
    .map(row => row.split(''));

function countOccupied(array) {
    let occupied = 0;
    array.forEach(row => {
        for (const l of row) {
            if (l === '#') occupied++;
        }
    });
    return occupied;
}

function traverseSeats(array) {
    let newArray = [];
    array.forEach((row, index) => {
        newArray[index] = [];
        row.forEach((seat, insideIndex) => {
            let tempArr = [[], [], []];
            if (array[index - 1]) {
                tempArr[0][0] = array[index - 1][insideIndex - 1];
                tempArr[0][1] = array[index - 1][insideIndex];
                tempArr[0][2] = array[index - 1][insideIndex + 1];
            }
            tempArr[1][0] = array[index][insideIndex - 1];
            tempArr[1][1] = array[index][insideIndex + 1];
            if (array[index + 1]) {
                tempArr[2][0] = array[index + 1][insideIndex - 1];
                tempArr[2][1] = array[index + 1][insideIndex];
                tempArr[2][2] = array[index + 1][insideIndex + 1];
            }
            tempArr = tempArr.map(row => row.filter(s => s).join(''));
            let occupied = countOccupied(tempArr);

            if (seat === 'L' && occupied === 0) seat = '#';
            if (seat === '#' && occupied >= 4) seat = 'L';
            newArray[index][insideIndex] = seat;
        });
    });
    return newArray;
}

function runPartOne(array) {
    let currentOccupied = 0;
    let newOccupied = 0;
    let newArray = traverseSeats(array);
    while (currentOccupied === 0 || (currentOccupied !== newOccupied)) {
        currentOccupied = newOccupied;
        newArray = traverseSeats(newArray);
        newOccupied = countOccupied(newArray);
    }
    return newOccupied;
}

console.log(runPartOne(input));


function countOccupiedComplex(array, index, insideIndex) {
    let occupied = 0;
    const directions = [
        {x: 1, y:0}, {x: -1, y:0},
        {x: 1, y:1}, {x: -1, y:-1},
        {x: 1, y:-1}, {x: -1, y:1},
        {x: 0, y:1}, {x: 0, y:-1}
    ];
    directions.forEach(({x: dx, y: dy}) => {
        let posX = insideIndex+dx;
        let posY = index+dy;
        while(posX >= 0 && posY >= 0 && posX < array[0].length && posY < array.length) {
            if(array[posY][posX] === '#') {
                occupied++;
                break;
            }
            if(array[posY][posX] === 'L') {
                break;
            }
            posX += dx;
            posY += dy;
        }
    })
    return occupied;
}

function traverseSeats2(array) {
    let newArray = [];
    array.forEach((row, index) => {
        newArray[index] = [];
        row.forEach((seat, insideIndex) => {
            const occupied = countOccupiedComplex(array, index, insideIndex);
            if (seat === 'L' && occupied === 0) seat = '#';
            if (seat === '#' && occupied >= 5) seat = 'L';
            newArray[index][insideIndex] = seat;
        });
    });
    return newArray;
}


function runPartTwo(array) {
    let currentOccupied = 0;
    let newOccupied = 0;
    let newArray = traverseSeats2(array);
    while (currentOccupied === 0 || (currentOccupied !== newOccupied)) {
        currentOccupied = newOccupied;
        newArray = traverseSeats2(newArray);
        newOccupied = countOccupied(newArray);
    }
    return newOccupied;
}
console.log(runPartTwo(input));
