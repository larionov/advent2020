//const input = [0, 3, 6];
const input = [0, 13, 1, 8, 6, 15];

console.log(input);

const mem = {};
let last;
input.forEach((v, i) => {
  mem[v] = [i + 1];
  last = v;
});
for (let i = input.length + 1; i <= 2020; i++) {
  let spoken;
  if (mem[last].length < 2) {
    spoken = 0;
  } else {
    const m = mem[last];
    spoken = m[m.length - 1] - m[m.length - 2];
  }

  if (!mem[spoken]) mem[spoken] = [i];
  else mem[spoken].push(i);
  console.log('turn:', { i, spoken }, '\n');
  last = spoken;
}
