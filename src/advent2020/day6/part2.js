//const input = (await Deno.readTextFile('./input_light.txt')).trim().split("\n");
const input = (await Deno.readTextFile('./input.txt')).trim().split('\n\n');

function getGroup(txt) {
  const answers = txt
    .split('\n')
    .map((l) => l.split(''))
    .map((l) =>
      l.reduce((acc, v) => {
        if (!acc[v]) {
          acc[v] = 1;
        } else {
          acc[v]++;
        }
        return acc;
      }, {}),
    )
    .reduce((acc, v) => {
      Object.keys(v).forEach((k) => {
        if (!acc[k]) {
          acc[k] = txt.split('\n').length - v[k];
        } else {
          acc[k] -= v[k];
        }
      });

      console.log({ acc });
      return acc;
    }, {});

  return Object.keys(answers).filter((k) => answers[k] === 0).length;
}
console.log(
  input.map(getGroup).reduce((v, acc) => {
    return acc + v;
  }, 0),
);
