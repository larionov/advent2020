//const input = (await Deno.readTextFile('./input_light.txt')).trim().split("\n");
const input = (await Deno.readTextFile('./input.txt')).trim().split('\n');

function parseRule(line) {
  const m = line.match(/^(.+) bags contain (.+).$/);
  //  console.log(m);
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

function bfs(index, nodeStart, nodeEnd, result) {
  let q = [];
  let discovered = {};

  q.push(nodeStart);
  while (q.length) {
    const v = q.pop();
    if (v === nodeEnd) {
      return nodeStart;
    }
    const edges = Object.keys(index[v].contains);
    edges.forEach((w) => {
      if (!discovered[w]) {
        discovered[w] = true;
        q.push(w);
      }
    });
  }
  return false;
}

const rules = input.map(parseRule);
const index = buildGraphIndex(rules);

const b = bfs(index, 'light red', 'shiny gold');
console.log({ rules, index, b });

console.log(
  Object.keys(index)
    .filter((n) => n !== 'shiny gold')
    .map((n) => bfs(index, n, 'shiny gold'))
    .filter(Boolean).length,
);
