import chalk from 'chalk';

let ACTIVE_CTX = [];
let TAB_SPACE = '   ';
let runStats = {
    status: true,
    failureCount: 0,
    runCount: 0
};

/**
 * @author https://gist.github.com/gordonbrander/2230317
 * 
 * Create a unique id everytime
 */
const genUID = () => {
    return Math.random().toString(36).substr(2, 4) + '-' + Math.random().toString(36).substr(2, 4) + '-' + Math.random().toString(36).substr(2, 4);
}

class StreamObj {
    constructor(msg) {
        this.id = genUID();
        this.space = utilities.getTabs();
        this.msg = msg;
    }
}

let utilities = {
    getTabs: function () {
        let tabs = '';
        ACTIVE_CTX.forEach(ctx => {
            tabs += TAB_SPACE;
        });
        return tabs;
    },
    /**
     * Get the verdict of test
     * @param {boolean} passed 
     * @param {string} msg 
     */
    fetchTestResult: function (msg = '') {
        let message = msg ?
            `${chalk.redBright.dim(msg)}` :
            '';
        return `${message}`;
    }
};

let OutputStream = {
    /**
     * @type {Array<StreamObj>}
     */
    output: [],
    reset: function () {
        this.output = [];
    },
    /**
     * 
     * @param {string} idx 
     * @param {string} msg 
     * @param {('prepend'|'postfix'|'replace')} options 
     */
    update: function (idx, msg, options) {
        this.output.forEach(op => {
            if (op.id === idx) {
                switch (options) {
                    case 'prepend':
                        op.msg = msg + op.msg;
                        break;
                    case 'postfix':
                        op.msg += msg;
                        break;
                    case 'replace':
                    default:
                        op.msg = msg;
                        break;
                }
            }
        });
    },
    /**
     * Adds data to the stream
     * @param {StreamObj} op 
     */
    push: function (op) {
        this.output.push(op);
    },
    /**
     * Flushes all the output to console
     */
    flush: function () {
        this.output.forEach(op => {
            console.log(op.space + op.msg);
        });
        this.reset();
    },
}

class ValidatorExtensions {
    #res;
    constructor(res) {
        this.#res = res;
    }
    /**
     * Check for equality of expected result with that of actual result
     * @param {<T>} expectedResult 
     */
    toEqual = function (expectedResult) {
        runStats.runCount++;
        let op = true;
        if (Array.isArray(expectedResult)) {
            for (let i = 0; i < expectedResult.length; i++) {
                if (this.#res[i] !== expectedResult[i]) {
                    op = op && false;
                }
            }
        } else if (this.#res !== expectedResult) {
            op = op && false;
        }
        if (!op) {
            runStats.status = false;
            runStats.failureCount++;
            let msg = utilities.fetchTestResult(`Expected = ${expectedResult}, Actual = ${this.#res}`);
            throw msg;
        }
    }
}

/**
 * A assert implementation for validating function executions
 * 
 * @param {Function} fn 
 * @param {Array<T>} params 
 * @return {ValidatorExtensions} Returns an implementation of ValidatorExtensions
 */
export function assert(input, params) {
    if (!input) {
        throw 'Input is a required parameter for Assert statements';
    }
    if (!ACTIVE_CTX.length || ACTIVE_CTX[ACTIVE_CTX.length - 1].ctx !== 'it') {
        throw `Assert statements can only be run withing an 'it' block`;
    }
    let res;
    if (typeof input === 'function') {
        if (params) {
            if (!Array.isArray(params)) {
                throw `'params' should be an Array of parameters`;
            }
            res = input(...params);
        } else {
            res = input();
        }
    } else {
        res = input;
    }
    return new ValidatorExtensions(res);
}

export function describe(desc, cb) {
    let streamObj = new StreamObj(`${desc}`);
    OutputStream.push(streamObj);
    ACTIVE_CTX.push({
        'ctx': 'describe',
        'desc': desc
    });
    cb();
    ACTIVE_CTX.pop();
    if (ACTIVE_CTX.length === 0) {
        if (!runStats.status) {
            console.log(chalk.red(`${runStats.failureCount}/${runStats.runCount} Tests failed`));
        } else {
            console.log(chalk.green(`All ${runStats.runCount} Tests passed`));
        }
        runStats.status = true;
        runStats.failureCount = 0;
        runStats.runCount = 0;
    }
}

export async function it(desc, cb) {
    let streamObj = new StreamObj(`${desc}`);
    OutputStream.push(streamObj);
    ACTIVE_CTX.push({
        'ctx': 'it',
        'desc': desc
    });
    try {
        cb();
        let verdict = chalk.green.inverse.bold(' PASS ') + ' ';
        OutputStream.update(streamObj.id, verdict, 'prepend');
    } catch (e) {
        let verdict = chalk.red.inverse.bold(' FAIL ') + ' ';
        OutputStream.update(streamObj.id, verdict, 'prepend');
        OutputStream.push(new StreamObj(chalk.redBright(e)));
    }
    OutputStream.flush();
    ACTIVE_CTX.pop();
}