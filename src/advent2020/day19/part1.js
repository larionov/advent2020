import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';

// 0: 4 1 5
// 1: 2 3 | 3 2
// 2: 4 4 | 5 5
// 3: 4 5 | 5 4
// 4: "a"
// 5: "b"

// a   ba    bb b
// 4   54    55 5
//     3-1  2-1
//       1 -1

// bababa
// abbbab
// aaabbb
// aaaabbb

const all = [];
for await (let line of readLines(Deno.stdin)) {
  all.push(line);
}
// function calcLength(head, level) {
//   console.log({ head });
//   if (head.children) {
//     let sum = 0;
//     for (let child = 0; child < head.children.length; child++) {
//       const seq = head.children[child];
//       //console.log({ seq });
//       for (let i = 0; i < seq.length; i++) {
//         const l = calcLength(rules[seq[i]], level + 1);
//         // console.log({ l });
//         sum += l;
//       }
//       console.log({ sum, seq });
//       // console.log({ sum });
//     }
//     head.l = sum;
//     return sum;
//   }

//   head.l = 1;
//   return 1;

//   //  return head.l;
// }

function search(head, str, index) {
  //console.log({ head, str, index });
  let dx = 0;
  if (Array.isArray(head)) {
    //        let foundSeq =
    for (let child = 0; child < head.length; child++) {
      const seq = head[child];
      //console.log('->seq: ', head[child]);
      //found = seq.length;
      let pos = index;
      let allFound = true;
      for (let i = 0; i < seq.length; i++) {
        //console.log('-> rule:', seq[i]);
        let found = search(rules[seq[i]], str, pos);
        if (found) {
          pos += found;
        } else {
          allFound = false;
          break;
        }
      }
      if (allFound) {
        //console.log('allFound');
        return pos - index;
      }
    }
    return 0;
  } else {
    //console.log({ head });
    return str[index] === head ? 1 : 0;
  }
  //console.log({ found });
  //  return 0;
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

//console.log({ rules });
//search(rules[0], 0);

console.log(rules); //JSON.stringify(rules, null, 0));

let count = lines
  .map((l) => l.length === search(rules[0], l, 0))
  .filter(Boolean).length;
console.log(count);
