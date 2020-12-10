//const input = (await Deno.readTextFile('./input_light.txt')).trim().split("\n");
const input = (await Deno.readTextFile('./input.txt'))
  .trim()
  .split('\n')
  .map((l) => parseInt(l, 10));

input.sort((a, b) => a - b);

function findDiffs(arr) {
  const res = [];
  for (let i = 0; i < arr.length - 1; i++) {
    res.push(arr[i + 1] - arr[i]);
  }
  return res;
}

const max = input[input.length - 1];
const used = [0, ...input, max + 3];
const diffs = findDiffs(used).reduce((acc, v) => {
  if (!acc[v]) {
    acc[v] = 1;
  } else {
    acc[v]++;
  }
  return acc;
}, {});

console.log({ diffs, used });
console.log(diffs[1] * diffs[3]);
