// const input = [
//     '1-3 a: abcde',
//     '1-3 b: cdefg',
//     '2-9 c: ccccccccc',
// ];

const input = (await Deno.readTextFile("./day2.txt")).split("\n");

function isValidPassword(line) {
    if (!line) return false;
    const [rule, pass] = line.split(': ');
    const [mm, char] = rule.split(' ');
    const [min, max] = mm.split('-').map(n => parseInt(n, 10));

    console.log({min, max, char, pass});
    const countChars = pass.split('').filter(c => c === char).length;


    return countChars <= max && countChars >= min;
}

function isValidPassword2(line) {
    if (!line) return false;
    const [rule, pass] = line.split(': ');
    const [mm, char] = rule.split(' ');
    const [first, last] = mm.split('-').map(n => parseInt(n, 10));

    const hasFirst = pass.split('')[first -1] === char;
    const hasLast = pass.split('')[last - 1] === char;

    console.log({first, last, char, pass});

    return (hasFirst && !hasLast) || (!hasFirst && hasLast);
}

console.log(input.map(isValidPassword).filter(Boolean).length);
console.log(input.map(isValidPassword2).filter(Boolean).length);
