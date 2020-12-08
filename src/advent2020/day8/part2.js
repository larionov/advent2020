//const input = (await Deno.readTextFile('./input_light.txt')).trim().split("\n");
const input = (await Deno.readTextFile('./input.txt')).trim().split('\n');

function parseProgram(text) {
  return text.map((l) => {
    const [opcode, arg] = l.split(' ');
    const sign = arg[0];
    const value = parseInt(arg.substring(1), 10);
    return [opcode, sign, value];
  });
}

function machine(program) {
  let acc = 0;
  let ip = 0;

  const completed = {};

  for (;;) {
    if (ip === program.length) return acc;

    let [opcode, sign, value] = program[ip];
    let signedValue = value * (sign === '-' ? -1 : 1);

    if (completed[ip]) return 'LOOP';

    completed[ip] = true;
    switch (opcode) {
      case 'nop':
        ip++;
        break;
      case 'acc':
        acc += signedValue;
        ip++;
        break;
      case 'jmp':
        ip += signedValue;
        break;
    }
  }
  return false;
}

const program = parseProgram(input);
machine(program);

for (let i = 0; i < program.length; i++) {
  const newProgram = program.map((l) => [...l]);
  if (newProgram[i][0] === 'nop') newProgram[i][0] = 'jmp';
  else if (newProgram[i][0] === 'jmp') newProgram[i][0] = 'nop';

  console.log(machine(newProgram));
}
