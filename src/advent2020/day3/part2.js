//const input = (await Deno.readTextFile("./input_light.txt")).split("\n");
const input = (await Deno.readTextFile("./input.txt")).split("\n");

function isTree(index, line) {
    return line.split('')[index % line.length] === '#';
}

function getSlope([right, down], data) {
    let count = 0;
    for (let d = 0, i = 0; d < data.length; d += down, i += right) {
        if(isTree(i, data[d])) {
            count ++;
        }
    }

    return count;
}

const inputs = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
const result = inputs.reduce((acc, v) => {
    console.log({acc, v, inputs});
    return acc * getSlope(v, input);
}, 1);

console.log(result);
