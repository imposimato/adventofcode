const fs = require('fs');

const input = fs.readFileSync('./17.txt')
    .toString('utf-8')
    .trimEnd()
    .split('\n')
    .map(x => [...x]);

let map = new Map(); // key x,y,z value: active/inactive
input.forEach((line, y) => {
    line.forEach((value, x) => {
        const active = value === '#';
        const id = [x, y, 0, 0].join(',');
        map.set(id, active);
    })
})


function getNeighbours(x, y, z, w, map) {
    const result = [];
    for (let i = x-1; i <= x+1; i++) {
        for (let j = y-1; j <= y+1; j++) {
            for (let k = z-1; k <= z+1; k++) {
                for (let l = w-1; l <= w+1; l++) {
                    if (i !== x || j !== y || k !== z || l !== w) {
                        const key = [i, j, k, l].join(',');
                        if (map.has(key)) {
                            result.push(map.get(key));
                        } else {
                            result.push(false);
                        }
                    }
                }
            }
        }
    }
    return result;
}

for (let i = 0; i < 6; i++) {
    const keys = map.keys();
    let minx = null;
    let miny = null;
    let minw = null;
    let minz = null;
    let maxx = null;
    let maxy = null;
    let maxz = null;
    let maxw = null;
    for (let key of keys) {
        const [x, y, z, w] = key.split(',').map(v => parseInt(v));
        if(x < minx) minx = x;
        if(y < miny) miny = y;
        if(z < minz) minz = z;
        if(w < minw) minw = w;
        if(x > maxx) maxx = x;
        if(y > maxy) maxy = y;
        if(z > maxz) maxz = z;
        if(w > maxw) maxw = w;
    }

    const newState = new Map();

    for (let x = minx - 1; x <= maxx + 1; x++) {
        for (let y = miny - 1; y <= maxy + 1; y++) {
            for (let z = minz - 1; z <= maxz + 1; z++) {
                for (let w = minw - 1; w <= maxw + 1; w++) {
                    const neighbours = getNeighbours(x, y, z, w, map);
                    const activeNeighbours = neighbours.filter(x => x).length;
                    const key = [x, y, z, w].join(',');
                    const isActive = map.has(key) ? map.get(key) : false;
                    if (isActive && activeNeighbours !== 2 && activeNeighbours !== 3) {
                        newState.set(key, false);
                    } else if (!isActive && activeNeighbours === 3) {
                        newState.set(key, true);
                    } else {
                        newState.set(key, isActive);
                    }
                }
            }
        }
    }
    map = newState;
}
let count = 0;
let cubes = map.values();
for (let cube of cubes) {
    if (cube) count++;
}

console.log(count);
