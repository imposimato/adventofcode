const fs = require('fs');

const pattern = /^(?<ticketParam>\w+?\s?\w+): (?<pos1>\d+)-(?<pos2>\d+) or (?<pos3>\d+)-(?<pos4>\d+)$/;

const input = fs.readFileSync('./test.txt')
    .toString('utf-8')
    .trimEnd()
    .split("\n\n")
    .map(chunk => chunk.split('\n'));

let [params, myTicket, tickets] = input;

const rules = params.map((line) => {
    const [name, rest] = line.split(": ");
    const x = rest.split(" or ").map((y) => y.split("-").map((z) => parseInt(z)));
    return [name, x];
});

const nearbyTickets = tickets
    .map((line) => line.split(",").map((i) => parseInt(i)));
const yourTicket = input[22].split(",").map((i) => parseInt(i));

myTicket = myTicket.slice(1)[0].split(',').map(v => parseInt(v));

tickets = tickets.slice(1).map(v => v.split(',').map(v => parseInt(v)));

const validIndexes = [];

const ticketParamObj = {}

params.forEach((p, ind) => {
    const {ticketParam, pos1, pos2, pos3, pos4} = pattern.exec(p).groups;
    ticketParamObj[ticketParam] = {
        pos1: parseInt(pos1),
        pos2: parseInt(pos2),
        pos3: parseInt(pos3),
        pos4: parseInt(pos4),
        ind,
    };
    for (let i = parseInt(pos1); i <= parseInt(pos2); i++) {
        validIndexes[i] = true;
    }
    for (let i = parseInt(pos3); i <= parseInt(pos4); i++) {
        validIndexes[i] = true;
    }
});

const ticketError = [];
const invalidTicketIndexes = [];
tickets.forEach((outT, outIndex) => {
    outT.forEach(t => {
        if (!validIndexes[t]) {
            ticketError.push(t);
            invalidTicketIndexes[outIndex] = true;
        }
    })
})

// console.log('Part One:', ticketError.reduce((acc, v) => acc + v));
let count = 0;
for (let i = 0; i < invalidTicketIndexes.length; i++) {
    if (!invalidTicketIndexes[i]) count++;
}

const validTickets = tickets.filter((v, i) => !invalidTicketIndexes[i]);

function checkTicket(n) {
    let result = [];
    for (const key in ticketParamObj) {
        let {pos1, pos2, pos3, pos4, ind} = ticketParamObj[key];
        if ((n >= pos1 && n <= pos2) || (n >= pos3 && n <= pos4)) {
            result.push(ind);
        }
    }
    return result;
}

const possibleSets = [];

function run(tickets) {
    for (let i = 0; i < tickets[0].length; i++) {
        for (let j = 0; j < tickets.length; j++) {
            // console.log(tickets[j][i]);
            let foundPossible = checkTicket(tickets[j][i]);
            if (foundPossible.length < tickets[0].length) {
                possibleSets.push(i, ...foundPossible);
            }
        }
    }
}

run(validTickets);
console.log(possibleSets);


