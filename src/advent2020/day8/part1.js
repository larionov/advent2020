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

  for (; ip < program.length; ) {
    let [opcode, sign, value] = program[ip];
    let signedValue = value * (sign === '-' ? -1 : 1);

    if (completed[ip]) break;
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

    console.log({ opcode, sign, value, signedValue, ip, acc });
  }
}

const program = parseProgram(input);
console.log(machine(program));
