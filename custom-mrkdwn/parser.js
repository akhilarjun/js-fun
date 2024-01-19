const { once } = require('events');
const rules = {
    desc: /\\desc\s([^\n]+)/g,
    given: /\\given\s([^\n]+)/g,
    when: /\\when\s([^\n]+)/g,
    then: /\\then\s([^\n]+)/g,
    shout: /\\shout\s([^\n]+)/g,
    say: /\\say\s([^\n]+)/g,
}

const parse = async (rl) => {
    const res = [];
    let keys = Object.keys(rules);
    /**
     * 
     * @param {string} line 
     */
    let praseLine = function (line) {
        for (let key of keys) {
            switch (key.toUpperCase()) {
                default:
                    if (line.match(rules[key])) {
                        let result = rules[key].exec(line)
                        let obj = {};
                        obj[key] = result[1];
                        res.push(obj);
                    }
                    break;
            }
        }
    }
    rl.on('line', praseLine);
    await once(rl, 'close');
    return res;
};

module.exports = parse;