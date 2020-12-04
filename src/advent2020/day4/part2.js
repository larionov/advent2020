//const input = await Deno.readTextFile('./input_valid.txt');
const input = await Deno.readTextFile('./input.txt');

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
  // cid (Country ID) - ignored, missing or not.

  const fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  const res = fields.map((f) => p[f]).filter(Boolean);
  const present = res.length === fields.length;

  if (!present) return false;

  // byr (Birth Year) - four digits; at least 1920 and at most 2002.
  const byr = parseInt(p.byr, 10);
  if (byr < 1920 || byr > 2002) return false;
  console.log({ p });

  // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  const iyr = parseInt(p.iyr, 10);
  if (iyr < 2010 || iyr > 2020) return false;

  // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  const eyr = parseInt(p.eyr, 10);
  if (eyr < 2020 || eyr > 2030) return false;

  // hgt (Height) - a number followed by either cm or in:
  //     If cm, the number must be at least 150 and at most 193.
  //     If in, the number must be at least 59 and at most 76.
  const hgt = parseInt(p.hgt, 10);
  if (p.hgt.endsWith('cm')) {
    if (hgt < 150 || hgt > 193) return false;
  } else if (p.hgt.endsWith('in')) {
    if (hgt < 59 || hgt > 76) return false;
  } else {
    return false;
  }

  // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  if (!/^#[0-9a-f]{6}$/.test(p.hcl)) {
    return false;
  }

  //ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(p.ecl)) {
    return false;
  }

  // pid (Passport ID) - a nine-digit number, including leading zeroes.
  if (!/^[0-9]{9}$/.test(p.pid)) {
    return false;
  }

  return true;
}
console.log(plines.map(getPassport).map(checkFields).filter(Boolean).length);
