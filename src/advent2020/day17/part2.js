import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';

function print(s) {
  const d = dim(s);
  for (let q = d.q; q <= d.Q; q++) {
    for (let z = d.z; z <= d.Z; z++) {
      console.log('Z:', z, 'Q:', q);
      for (let y = d.y; y <= d.Y; y++) {
        const s = [];
        for (let x = d.x; x <= d.X; x++) {
          s.push(state[i(x, y, z)] ? '#' : '.');
        }
        console.log(s.join(''));
      }
    }
  }
  //  console.log(s.map((r) => r.join('')).join('\n'));
}
function i(...args) {
  return args.join('_');
}

function neighbors(x, y, z, q) {
  const r = [];
  for (let dq = q - 1; dq <= q + 1; ++dq) {
    for (let dz = z - 1; dz <= z + 1; ++dz) {
      for (let dy = y - 1; dy <= y + 1; ++dy) {
        for (let dx = x - 1; dx <= x + 1; ++dx) {
          if (dx != x || dy != y || dz != z || dq != q) {
            r.push([dx, dy, dz, dq]);
          }
        }
      }
    }
  }
  return r;
}

function dim(state) {
  let x = 100,
    y = 100,
    z = 100,
    q = 100;
  let X = -100,
    Y = -100,
    Z = -100,
    Q = -100;
  Object.keys(state).forEach((k) => {
    let [xx, yy, zz, qq] = k.split('_').map((v) => parseInt(v, 10));
    if (xx > X) X = xx;
    if (xx < x) x = xx;

    if (yy > Y) Y = yy;
    if (yy < y) y = yy;

    if (zz > Z) Z = zz;
    if (zz < z) z = zz;

    if (qq > Q) Q = qq;
    if (qq < q) q = qq;
  });
  return { x, y, z, q, X, Y, Z, Q };
}

let state = {};
let q = 0;
let z = 0;
let x = 0;
let y = 0;
for await (let line of readLines(Deno.stdin)) {
  x = 0;
  for (let b of line.trim().split('')) {
    if (b === '#') state[i(x, y, z, q)] = 1;
    x++;
  }
  y++;
}
console.log('--------------------------- start --------------------------');
for (let step = 0; step < 6; step++) {
  const d = dim(state);
  const newState = JSON.parse(JSON.stringify(state));
  console.log('\n############ step', step, '#####', d);
  for (let q = d.q - 1; q <= d.Q + 1; q++) {
    for (let z = d.z - 1; z <= d.Z + 1; z++) {
      for (let y = d.y - 1; y <= d.Y + 1; y++) {
        for (let x = d.x - 1; x <= d.X + 1; x++) {
          const n = neighbors(x, y, z, q);
          const activeN = n.map((c) => state[i(...c)]).filter(Boolean).length;
          if (state[i(x, y, z, q)]) {
            if (activeN !== 2 && activeN !== 3) {
              delete newState[i(x, y, z, q)];
            }
          } else {
            if (activeN === 3) {
              newState[i(x, y, z, q)] = 1;
            }
          }
        }
      }
    }
  }

  state = newState;
  print(state);
  console.log(Object.keys(state).length);
}
//console.log(state);
