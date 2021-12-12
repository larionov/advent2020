import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';
import { parse } from './arith.js';

let res = 0;
for await (let line of readLines(Deno.stdin)) {
  res += parse(line);
}
console.log(res);
