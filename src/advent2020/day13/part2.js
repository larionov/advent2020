//const input = (await Deno.readTextFile('./input_light.txt')).trim().split("\n");
const input = (await Deno.readTextFile('./input.txt')).trim().split('\n');
const sc = input[1].split(',').map((c) => (c === 'x' ? 0 : parseInt(c, 10)));

let jmp = sc[0];
let i = sc[0];

for (let _b in sc) {
  let b = parseInt(_b);
  if (b == 0) continue;
  if (sc[b] > 0) {
    for (;;) {
      if ((i + b) % sc[b] === 0) {
        break;
      }
      i += jmp;
    }
    jmp *= sc[b];
  }
}

/*    3 x 5 7
    0 x . x x
    1 . . . .
    2 . . . .
 0  3 x . . .
 1  4 . . . .
 2  5 . . x .
 3  6 x . . .
 4  7 . . . x
 5  8 . . . .
 6  9 x . . .
 7 10 . . x .
 8 11 . . . .
 9 12 x . . .
10 13 . . . .
11 14 . . . x
12 15 x . x .
13 16 . . . .
14 17 . . . .
15 18 x . . .
16 19 . . . .
17 20 . . x .
18 21 x . . x
19 22 . . . .
20 23 . . . .
*/
