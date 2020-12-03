const input = (await Deno.readTextFile("./day1_light.txt")).split("\n").map(v => parseInt(v, 10));
// const input = (await Deno.readTextFile("./day1.txt")).split("\n").map(v => parseInt(v, 10));

function findSumTo2020(arr) {
    const filtered = arr.filter(v => v <= 2020);
    for (let i = 0; i < filtered.length; i++) {
        for (let j = 0; j < filtered.length; j++) {
            for (let k = 0; k < filtered.length; k++) {
                if (filtered[i] + filtered[j] + filtered[k] === 2020) {
                    return(filtered[i] * filtered[j] * filtered[k]);
                }
            }
        }
    }
    return 0;
}

console.log(findSumTo2020(input));
