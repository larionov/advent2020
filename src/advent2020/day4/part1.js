//const input = await Deno.readTextFile('./input_light.txt');
const input = await Deno.readTextFile('./input.txt');

console.log('test');

const plines = input.split('\n\n');
console.log(plines);

function getPassport(line) {
  const p = line
    .split('\n')
    .join(' ')
    .split(' ')
    .map((l) => l.split(':'))
    .reduce((acc, l) => {
      if (!l[0]) return acc;
      acc[l[0]] = l[1];
      return acc;
    }, {});
  console.log(p);
  return p;
}

function checkFields(p) {
  // byr (Birth Year)
  // iyr (Issue Year)
  // eyr (Expiration Year)
  // hgt (Height)
  // hcl (Hair Color)
  // ecl (Eye Color)
  // pid (Passport ID)
  // cid (Country ID)
  const fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  const res = fields.map((f) => p[f]).filter(Boolean);
  console.log({ p, res });
  return res.length === fields.length;
}
console.log(plines.map(getPassport).map(checkFields).filter(Boolean).length);
