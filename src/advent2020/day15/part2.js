//const input = [0, 3, 6];
const input = [0, 13, 1, 8, 6, 15];

const mem = new Array(30000000);
let last;
input.forEach((v, i) => {
  mem[v] = [i + 1];
  last = v;
});
let spoken;

for (let i = input.length + 1; i <= 30000000; i++) {
  if (mem[last].length < 2) {
    spoken = 0;
  } else {
    const m = mem[last];
    spoken = m[m.length - 1] - m[m.length - 2];
  }

  if (!mem[spoken]) mem[spoken] = [i];
  else mem[spoken].push(i);

  if (mem[spoken].length > 3) mem[spoken] = mem[spoken].slice(-2);
  last = spoken;
  if (i % 1000 === 0) console.log({ i, spoken });
}

console.log(spoken);
