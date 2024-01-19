const fs = require('fs');
const readline = require('readline');
const parse = require('./parser');
const chalk = require('chalk');

async function processLineByLine() {
    const fileStream = fs.createReadStream('sample.tst');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    let res = parse(rl);
    const log = (msg) => {
        console.log(`> ${msg}`)
    }
    res.then(data => {
        data.forEach(d => {
            let keys = Object.keys(d);
            switch (keys[0].toUpperCase()) {
                case 'SHOUT':
                case 'SAY':
                    log(chalk.yellow(d[keys[0]]));
                    break;
            }
        })
    })
}

processLineByLine();