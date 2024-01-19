import { assert, describe, it } from "./assert.js";

/**
 * 
 * @param {Array<Promise>} promises 
 */
function promiseAll(promises) {
    let results = new Array().fill(promises.length);
    let resultCounter = 0;
    return new Promise((res, rej) => {
        promises.forEach((promise, index) => {
            promise.then(data => {
                results[index] = data;
                resultCounter++;
                if (resultCounter === promises.length) {
                    res(results);
                }
            }).catch(e => {
                rej(e);
            });
        })
    });
}

let p1 = Promise.resolve(5);
let needTime = new Promise((res, rej) => {
    setTimeout(() => {
        res('time');
    }, 2000);
});
let p2 = Promise.resolve(20);
// console.time('promise.all')
// promiseAll([p1, p2, needTime]).then(data => {
//     console.log(data)
//     console.timeEnd('promise.all')
// });
describe('Promise.All', () => {
    it('should run all promises', async () => {
        let data = await promiseAll([p1, p2]);
        assert(data).toEqual([5, 20]);
    })
});
