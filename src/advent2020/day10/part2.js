//const input = (await Deno.readTextFile('./input_light.txt')).trim().split("\n");
const input = (await Deno.readTextFile('./input.txt'))
  .trim()
  .split('\n')
  .map((l) => parseInt(l, 10));

input.sort((a, b) => a - b);

function scan(list) {
  const sums = {};
  for (let i = list.length - 1; i >= 0; i--) {
    let count = 0;
    for (let j = i + 1; j < list.length; j++) {
      if (list[j] - list[i] <= 3 && list[j] - list[i] >= 0) {
        count += sums[list[j]];
      }
    }
    sums[list[i]] = count || 1;
  }
  return sums;
}

const sums = scan([0, ...input, input[input.length - 1] + 3]);
console.log(sums[0]);
