//const input = (await Deno.readTextFile('./input_light.txt')).trim().split("\n");
const input = (await Deno.readTextFile('./input.txt')).trim().split("\n");

function getSeat(line) {
  let a = 0; let b = 127;
  let x = 0; let y = 7;

  for (let i =0; i< 7; i++) {
    if (line[i] === 'F') {
      b = a + Math.floor((b - a) / 2) ;
    }
    if (line[i] === 'B') {
      a = a + Math.ceil((b - a) / 2);

    }
  }
  for (let i =7; i< 11; i++) {
    if (line[i] === 'L') {
      y = x + Math.floor((y - x) / 2) ;
    }
    if (line[i] === 'R') {
      x = x + Math.ceil((y - x) / 2);

    }
  }

  const id = a * 8 + x;
  return id;
}

const ids = input.map(line => getSeat(line));

const max = ids.reduce((acc, v) => {
  if (v > acc) {
    acc = v;
  }
  return acc;
}, 0);
console.log(max);


const sorted = ids.sort((a, b) => {
  return a -b;
});

sorted.forEach(s => console.log(s));

let count = 0;
for (let i = 0; i < max; ) {

  if (sorted[count] !== i) {
    console.log('missing', i - 1);
    i = sorted[count] + 1;
  } else {
    i++;
  }
  count++;
}
