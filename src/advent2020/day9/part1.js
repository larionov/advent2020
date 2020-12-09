//const input = (await Deno.readTextFile('./input_light.txt')).trim().split("\n");
const input = (await Deno.readTextFile('./input.txt'))
  .trim()
  .split('\n')
  .map((l) => parseInt(l, 10));
console.log(input);

function getPreamble(i, len, data) {
  return data.slice(i, i + len);
}

function getData(i, len, data) {
  return data.slice(i + len, data.length - 1);
}

function findSum(index, len, data) {
  const preamble = getPreamble(index, len, data);
  const d = getData(index, len, data);
  //  console.log(d, preamble);

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (i !== j) {
        //        console.log({ i, j, pi: preamble[i], pj: preamble[j], di: d[index] });
        if (preamble[i] + preamble[j] === d[0]) return false;
      }
    }
  }
  return d[0];
}

const d = getData(0, 25, input);
console.log(d.map((n, i) => findSum(i, 25, input)).filter(Boolean));
