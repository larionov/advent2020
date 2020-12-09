//const input = (await Deno.readTextFile('./input_light.txt')).trim().split("\n");
const input = (await Deno.readTextFile('./input.txt'))
  .trim()
  .split('\n')
  .map((l) => parseInt(l, 10));

function findContSum(num, data) {
  for (let i = 0; i < data.length; i++) {
    let sum = 0;
    for (let j = i; j < data.length; j++) {
      sum += data[j];
      if (sum > num) break;
      if (sum === num) return [i, j];
      console.log({ sum, i, j });
    }
  }
  return false;
}

//const d = getData(0, 25, input);
//console.log(d.map((n, i) => findSum(i, 25, input)).filter(Boolean));
// 105950735

//const [s, e] = findContSum(105950735, input);
const [s, e] = [448, 464];
const sl = input.slice(s, e + 1).sort();

console.log({ sl });
//console.log(findContSum(127, input));

console.log(4117189 + 9709726);
