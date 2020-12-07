//const input = (await Deno.readTextFile('./input_light.txt')).trim().split("\n");
//const input = (await Deno.readTextFile('./input_light2.txt')).trim().split("\n");
const input = (await Deno.readTextFile('./input.txt')).trim().split('\n');

function parseRule(line) {
  const m = line.match(/^(.+) bags contain (.+).$/);
  const name = m[1].trim();
  const contains = m[2]
    .split(',')
    .map((s) => s.replace(/bag[s]?/, ''))
    .map((s) => s.trim())
    .reduce((acc, v) => {
      if (v === 'no other') return acc;
      const [, c, n] = v.match(/(\d+) (.+)/);
      acc[n] = parseInt(c, 10);
      return acc;
    }, {});
  return { name, contains };
}

function buildGraphIndex(rules) {
  return rules.reduce((acc, r) => {
    acc[r.name] = r;
    return acc;
  }, {});
}

function findChildGraphWeight(index, nodeStart) {
  let q = [];
  let result = 0;

  q.push([nodeStart, 1]);
  while (q.length) {
    const [v, parentWeight] = q.pop();

    result += parentWeight;
    const edges = Object.keys(index[v].contains);
    edges.forEach((w) => {
      q.push([w, index[v].contains[w] * parentWeight]);
    });
  }
  return result - 1;
}
const rules = input.map(parseRule);
const index = buildGraphIndex(rules);

console.log(findChildGraphWeight(index, 'shiny gold'));
