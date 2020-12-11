//const input = (await Deno.readTextFile('./input_light.txt')).trim().split("\n");
const input = (await Deno.readTextFile('./input_light.txt'))
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
  for (let i = 0; i < w + h; i++) n += get(x - i, y, seats) === '#' ? 1 : 0;
  for (let i = 0; i < w + h; i++) n += get(x - i, y - i, seats) === '#' ? 1 : 0;
  for (let i = 0; i < w + h; i++) n += get(x, y - i, seats) === '#' ? 1 : 0;
  for (let i = 0; i < w + h; i++) n += get(x + i, y - i, seats) === '#' ? 1 : 0;
  for (let i = 0; i < w + h; i++) n += get(x + 1, y, seats) === '#' ? 1 : 0;
  for (let i = 0; i < w + h; i++) n += get(x + i, y + i, seats) === '#' ? 1 : 0;
  for (let i = 0; i < w + h; i++) n += get(x, y + i, seats) === '#' ? 1 : 0;
  for (let i = 0; i < w + h; i++) n += get(x - i, y + i, seats) === '#' ? 1 : 0;
  return n;
}

function clone(seats) {
  return seats.map((l) => [...l]);
}

function iterate(seats) {
  const newSeats = clone(seats);
  print(newSeats);
  console.log('it');
  for (let y = 0; y < seats.length; y++) {
    for (let x = 0; x < seats[0].length; x++) {
      const n = countNeighbors(x, y, seats);

      if (get(x, y, seats) === 'L' && n === 0) {
        put(x, y, '#', newSeats);
      } else if (get(x, y, seats) === '#' && n >= 4) {
        put(x, y, 'L', newSeats);
      }
    }
  }
  return newSeats;
}

let seats = clone(input);
for (;;) {
  let newSeats = iterate(seats);
  print(newSeats);
  console.log('count:', count(newSeats));
  if (compare(newSeats, seats)) break;
  seats = newSeats;
}
