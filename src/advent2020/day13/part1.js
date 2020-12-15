//const input = (await Deno.readTextFile('./input_light.txt')).trim().split("\n");
const input = (await Deno.readTextFile('./input_light4.txt'))
  .trim()
  .split('\n');

const [tstart, sc] = [
  parseInt(input[0], 10),
  input[1]
    .split(',')
    .filter((c) => c !== 'x')
    .map((c) => parseInt(c, 10)),
];

console.log({ tstart, sc });

for (let i = tstart; ; i++) {
  console.log(`${i}: `, sc.map((b) => (i % b === 0 ? 'D' : '.')).join('   '));
  const buses = sc.map((b) => (i % b === 0 ? b : false)).filter(Boolean);
  if (buses.length) {
    console.log(sc, buses, buses[0] * (i - tstart));
    break;
  }
}
