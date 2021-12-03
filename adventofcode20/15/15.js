const input = [14,8,16,0,1,17];
const map = new Map([...input.map((value, index) => [value, index])]);

let lastSpoken = 0;
let next = 0;
let target = 30000000;

for (let i = input.length; i < target; i++) {
    const lastOcc = map.get(next);
    map.set(next, i);
    lastSpoken = next;
    next = lastOcc === undefined ? 0 : i - lastOcc;
}

console.log(lastSpoken);

