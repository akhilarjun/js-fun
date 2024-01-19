import { describe, assert, it } from "./assert.js";

describe('whole suite', () => {
    describe('Dummy block', function () {
        it('should run this dummy test', function () {
            assert(1).toEqual(1);
        });
    });

    describe('Dummy block 2', () => {
        it('should run this dummy test 2', () => {
            assert(1).toEqual(2);
        });
        it('should run this dummy test 3 inside dummy block 2', () => {
            assert(true).toEqual(true);
        });
    });
});

let p1 = Promise.resolve(5);
let needTime = new Promise((res, rej) => {
    setTimeout(() => {
        res('time');
    }, 2000);
});
let p2 = Promise.resolve(20);
// describe('Async functions', () => {
//     it('should evaluate async functions', async () => {
//         console.log('it')
//         let data = await p1;
//         assert(data).toEqual(5);
//     })
// })