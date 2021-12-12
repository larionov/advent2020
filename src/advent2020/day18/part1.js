import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';

function parse(str, start) {
  let op = '';
  let result = 0;
  //console.log(str.slice(start), str.length);
  for (let i = start; i < str.length; i++) {
    //    console.log('***', start, { i }, str[i], str.length, { result });
    if ('01234556789'.indexOf(str[i]) !== -1) {
      const v = parseInt(str[i], 10);
      if (op === '') {
        result = v;
      } else if (op === '+') {
        result += v;
      } else if (op === '*') {
        result *= v;
      }
    } else if (str[i] === '+') {
      op = '+';
      //s.push('+');
    } else if (str[i] === '*') {
      op = '*';
      //s.push('+');
    } else if (str[i] === '(') {
      const [v, inc] = parse(str, i + 1);
      if (op === '') {
        result = v;
      } else if (op === '+') {
        result += v;
      } else if (op === '*') {
        result *= v;
      }
      i += inc + 1;
    } else if (str[i] === ')') {
      //console.log('<<<', { result });
      return [result, i - start];
    } else {
    }
  }
  return result; //[result, str.length];
}

let res = 0;
for await (let line of readLines(Deno.stdin)) {
  //  console.log({ line });
  res += parse(line, 0);
  //console.log(evaluate(parse(line)));
}
console.log(res);

// 1 + 2 * 3 + 4 * 5 + 6
