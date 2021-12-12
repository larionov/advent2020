import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';

// 0: 4 1 5
// 1: 2 3 | 3 2
// 2: 4 4 | 5 5
// 3: 4 5 | 5 4
// 4: "a"
// 5: "b"

const all = [];
for await (let line of readLines(Deno.stdin)) {
  all.push(line);
}
function search_seq(line, rules, seq) {
  let inputs = [line];
  for (let rule of seq) {
    if (inputs.length === 0) break;

    const newInputs = [];
    for (let input of inputs) {
      for (let found of search(rules, rule, input)) {
        newInputs.push(found);
      }
    }
    inputs = newInputs;
  }
  return inputs;
}

function search(rules, rule, str) {
  const head = rules[rule];
  let dx = 0;
  const inputs = [str];
  if (Array.isArray(head)) {
    let results = [];
    for (let child = 0; child < head.length; child++) {
      for (let input of search_seq(str, rules, head[child])) {
        results.push(input);
      }
    }

    return results;
  }
  return str[0] === head ? [str.substring(1)] : [];
}

const [rulesText, lines] = all
  .join('\n')
  .split('\n\n')
  .map((l) => l.split('\n'));

const rules = rulesText.reduce((acc, l) => {
  const [index, rule] = l.split(': ');
  if (rule[0] === '"') {
    acc[index] = rule[1];
  } else {
    acc[index] = rule
      .split(' | ')
      .map((l) => l.split(' ').map((v) => parseInt(v, 10)));
  }

  return acc;
}, {});

rules[8] = [[42], [42, 8]];
rules[11] = [
  [42, 31],
  [42, 11, 31],
];

console.log(rules);

let count = lines
  .map((l) => search(rules, 0, l))
  .map((v) => v[0])
  .filter((v) => typeof v !== 'undefined')
  .filter((v) => v.length === 0).length;

console.log(count);
