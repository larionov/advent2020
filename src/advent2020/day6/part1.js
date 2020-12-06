//const input = (await Deno.readTextFile('./input_light.txt')).trim().split("\n");
const input = (await Deno.readTextFile('./input.txt')).trim().split('\n\n');

function getGroup(txt) {
  return new Set(txt.split('\n').join('').split('')).size;
}

console.log(
  input.map(getGroup).reduce((v, acc) => {
    return acc + v;
  }, 0),
);
