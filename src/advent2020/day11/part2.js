//const input = (await Deno.readTextFile('./input_light.txt')).trim().split("\n");
const input = (await Deno.readTextFile('./input.txt'))
  .trim()
  .split('\n')
  .map((l) => l.split(''));

function print(seats) {
  console.log('--------------');
  seats.forEach((l) => console.log(l.join('')));
}
function put(x, y, v, seats) {
  if (x < 0 || y < 0) return;
  if (x >= seats[0].length || y >= seats.length) return;
  seats[y][x] = v;
}
function get(x, y, seats) {
  let res = '';
  if (x < 0 || y < 0) res = '.';
  else if (x >= seats[0].length || y >= seats.length) res = '.';
  else res = seats[y][x];
  //  console.log({ x, y, res });
  return res;
}

function compare(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function count(seats) {
  let n = 0;
  seats.forEach((l) => {
    l.forEach((s) => {
      if (s === '#') n++;
    });
  });
  return n;
}
function countNeighbors(x, y, seats) {
  const w = seats[0].length;
  const h = seats.length;
  let n = 0;
  let v;
  for (let i = 1; i < w + h; i++) {
    v = get(x - i, y, seats);
    if (v === 'L') break;
    if (v === '#') {
      n++;
      break;
    }
  }
  for (let i = 1; i < w + h; i++) {
    v = get(x - i, y - i, seats);
    if (v === 'L') break;
    if (v === '#') {
      n++;
      break;
    }
  }
  for (let i = 1; i < w + h; i++) {
    v = get(x, y - i, seats);
    if (v === 'L') break;
    if (v === '#') {
      n++;
      break;
    }
  }
  for (let i = 1; i < w + h; i++) {
    v = get(x + i, y - i, seats);
    if (v === 'L') break;
    if (v === '#') {
      n++;
      break;
    }
  }
  for (let i = 1; i < w + h; i++) {
    v = get(x + i, y, seats);
    if (v === 'L') break;
    if (v === '#') {
      n++;
      break;
    }
  }
  for (let i = 1; i < w + h; i++) {
    v = get(x + i, y + i, seats);
    if (v === 'L') break;
    if (v === '#') {
      n++;
      break;
    }
  }
  for (let i = 1; i < w + h; i++) {
    v = get(x, y + i, seats);
    if (v === 'L') break;
    if (v === '#') {
      n++;
      break;
    }
  }
  for (let i = 1; i < w + h; i++) {
    v = get(x - i, y + i, seats);
    if (v === 'L') break;
    if (v === '#') {
      n++;
      break;
    }
  }
  return n;
}

function clone(seats) {
  return seats.map((l) => [...l]);
}

function iterate(seats) {
  const newSeats = clone(seats);
  console.log('it');
  //print(seats);
  for (let y = 0; y < seats.length; y++) {
    for (let x = 0; x < seats[0].length; x++) {
      const n = countNeighbors(x, y, seats);
      //      console.log(n, get(x, y, seats));
      //console.log(n);

      if (get(x, y, seats) === 'L' && n === 0) {
        put(x, y, '#', newSeats);
      } else if (get(x, y, seats) === '#' && n >= 5) {
        put(x, y, 'L', newSeats);
      }
    }
  }
  return newSeats;
}

// print(input);
// let it1 = iterate(input);
// let it2 = iterate(it1);
// let it3 = iterate(it2);
// //let it4 = iterate(it3);

// print(it3);
let seats = clone(input);
for (;;) {
  let newSeats = iterate(seats);
  print(newSeats);
  console.log('count:', count(newSeats));
  if (compare(newSeats, seats)) break;
  seats = newSeats;
}
