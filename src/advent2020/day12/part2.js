//const input = (await Deno.readTextFile('./input_light.txt')).trim().split("\n");
const input = (await Deno.readTextFile('./input.txt'))
  .trim()
  .split('\n')
  .map((l) => l.match(/([A-Z])(.+)/))
  .map(([_, dir, len]) => [dir, parseInt(len, 10)]);

function add([x1, y1], [x2, y2]) {
  return [x1 + x2, y1 + y2];
}
function muls([x1, y1], s) {
  return [x1 * s, y1 * s];
}
function mul(m1, m2) {
  var result = [];
  for (var i = 0; i < m1.length; i++) {
    result[i] = [];
    for (var j = 0; j < m2[0].length; j++) {
      var sum = 0;
      for (var k = 0; k < m1[0].length; k++) {
        sum += m1[i][k] * m2[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

function mulT(m1, m2, T) {
  let res = m1;
  for (let i = 0; i < T; i++) {
    res = mul(res, m2);
  }
  return res;
}

const rots = {
  0: [1, 0],
  90: [0, 1],
  180: [-1, 0],
  270: [0, -1],
};

const D = {
  N: [0, 1],
  W: [-1, 0],
  S: [0, -1],
  E: [1, 0],
};

const rotR = [
  [0, -1],
  [1, 0],
];
const rotL = [
  [0, 1],
  [-1, 0],
];

// console.log(add([1,2], [3,4]));

// console.log(mul([[1,2]], rotL));
// console.log(mul([[1,2]], rotR));

//let dir = [1, 0]; // east
let angle = 0;
let pos = [0, 0];
let wp = [10, 1];

input.forEach(([d, v]) => {
  switch (d) {
    case 'L':
      wp = mulT([wp], rotL, v / 90)[0];
      break;
    case 'R':
      wp = mulT([wp], rotR, v / 90)[0];
      break;
    case 'F':
      pos = add(muls(wp, v), pos);
      break;
    case 'N':
      wp = add(muls(D.N, v), wp);
      break;
    case 'S':
      wp = add(muls(D.S, v), wp);
      break;
    case 'E':
      wp = add(muls(D.E, v), wp);
      break;
    case 'W':
      wp = add(muls(D.W, v), wp);
      break;
    default:
      console.log('!!!!!!!!!!!!!!!!!!');
  }
  console.log({ d, v, angle, pos, wp });
});

console.log(Math.abs(pos[0]) + Math.abs(pos[1]));
