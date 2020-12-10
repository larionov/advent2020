//const input = (await Deno.readTextFile('./input_light.txt')).trim().split("\n");
const input = (await Deno.readTextFile('./input_light.txt')).trim().split('\n');

function parseRule(line) {
  const m = line.match(/^(.+) bags contain (.+).$/);
  //  console.log(m);
  const contents = m[2]
    .split(',')
    .map((s) => s.replace(/bag[s]?/, ''))
    .map((s) => s.trim());
  const name = m[1].trim();
  console.log({ m, contents });
}

const rules = input.map(parseRule);
