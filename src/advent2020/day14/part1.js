//const input = (await Deno.readTextFile('./input_light.txt')).trim().split("\n");
const input = (await Deno.readTextFile('./input_light.txt'))
  .trim()
  .split('\n')
  .map((l) => {
    if (l.startsWith('mask =')) {
      return ['mask', l.split(' = ')[1].trim()];
    } else {
      return [
        'set',
        ...l
          .match(/\[(.+)\] = (.+)/)
          .slice(1)
          .map((n) => parseInt(n, 10)),
      ];
    }
  });

function getMask(str) {
  let m = new Array(32).join(0).split('');
  let im = new Array(32).join(0).split('');
  for (let i = 0; i < 32; i++) {
    if (str[i] === '0') im[i] = 1;
    if (str[i] === '1') m[i] = 1;
  }
  return [m, im];
}

function applyMask([m, im], value) {
  const v = value.split('');
  for (let i = 0; i < 32; i++) {
    if (m[i] === 1) v[i] = 1;
    if (im[i] === 1) v[i] = 0;
  }
  return v.join('');
}

function getBin(n) {
  let r = new Array(32).join(0).split('');
  for (let i = 0; i < 32; i++) {
    r[i] = (n / 2) % 2 === 0 ? 0 : 1;
    n = Math.floor(n / 2);
  }
  return r.reverse();
}

const mem = [];
// for (let i = 0; i < input.length; i++) {
//   console.log(input[i]);
//   if
//     }
let m = 0;
let im = 0;
input.forEach(([op, ...val]) => {
  console.log({ op, val });
  if (op === 'mask') {
    [m, im] = getMask(val[0]);
    console.log({ m, im });
  }

  if (op === 'set') {
    mem[val[0]] = applyMask([m, im], getBin(val[1]).join(''));
    //    mem[val[0]] = applyMask([m, im], val[1]);
  }
});

console.log(
  mem.map((v) => {
    return v ? parseInt(v, 2) : undefined;
  }),
);
