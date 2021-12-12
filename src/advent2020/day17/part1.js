import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';

function print(s) {
  const d = dim(s);
  for (let z = d.z; z <= d.Z; z++) {
    console.log('Z:', z);
    for (let y = d.y; y <= d.Y; y++) {
      const s = [];
      for (let x = d.x; x <= d.X; x++) {
        s.push(state[i(x, y, z)] ? '#' : '.');
      }
      console.log(s.join(''));
    }
  }
  //  console.log(s.map((r) => r.join('')).join('\n'));
}
function i(...args) {
  return args.join('_');
}

function neighbors(x, y, z) {
  const r = [];
  for (let dz = z - 1; dz <= z + 1; ++dz) {
    for (let dy = y - 1; dy <= y + 1; ++dy) {
      for (let dx = x - 1; dx <= x + 1; ++dx) {
        if (dx != x || dy != y || dz != z) {
          r.push([dx, dy, dz]);
        }
      }
    }
  }
  return r;
}

function dim(state) {
  let x = 100,
    y = 100,
    z = 100;
  let X = -100,
    Y = -100,
    Z = -100;
  Object.keys(state).forEach((k) => {
    let [xx, yy, zz] = k.split('_').map((v) => parseInt(v, 10));
    if (xx > X) X = xx;
    if (xx < x) x = xx;

    if (yy > Y) Y = yy;
    if (yy < y) y = yy;

    if (zz > Z) Z = zz;
    if (zz < z) z = zz;
  });
  return { x, y, z, X, Y, Z };
}

let state = {};
let z = 0;
let x = 0;
let y = 0;
for await (let line of readLines(Deno.stdin)) {
  x = 0;
  for (let b of line.trim().split('')) {
    if (b === '#') state[i(x, y, z)] = 1;
    x++;
  }
  y++;
}
console.log('--------------------------- start --------------------------');
for (let step = 0; step < 6; step++) {
  const d = dim(state);
  const newState = JSON.parse(JSON.stringify(state));
  console.log('\n############ step', step, '#####', d);

  for (let z = d.z - 1; z <= d.Z + 1; z++) {
    for (let y = d.y - 1; y <= d.Y + 1; y++) {
      for (let x = d.x - 1; x <= d.X + 1; x++) {
        const n = neighbors(x, y, z);
        const activeN = n.map((c) => state[i(...c)]).filter(Boolean).length;
        if (state[i(x, y, z)]) {
          if (activeN !== 2 && activeN !== 3) {
            delete newState[i(x, y, z)];
          }
        } else {
          if (activeN === 3) {
            newState[i(x, y, z)] = 1;
          }
        }
      }
    }
  }

  state = newState;
  print(state); //console.log({ state });
  console.log(Object.keys(state).length);
}
//console.log(state);
