import { assert, describe, it } from "./assert.js";

/**
 * Find smallest and largest from an unsorted array
 */
function findLargestAndSmallest(input) {
    let smallest = Infinity;
    let largest = -Infinity;
    input.forEach(i => {
        if (i < smallest) {
            smallest = i;
        }
        if (i > largest) {
            largest = i;
        }
    });
    return [smallest, largest];
}

describe('Smallest and Largest Algorithm', () => {
    it('should return -56 and 23', () => {
        let input = [1, 5, 10, 23, -12, 9, -56, -20, 9];
        assert(findLargestAndSmallest, [input]).toEqual([-56, 23]);
    });
    it('should return 0 and 199', () => {
        let input = [1, 5, 10, 23, 0, 9, 56, 20, 199];
        assert(findLargestAndSmallest, [input]).toEqual([0, 199]);
    });
    it('should return -23 and 15', () => {
        let input = [1, 5, 10, -23, 0, 9, 15, 2, 12];
        assert(findLargestAndSmallest, [input]).toEqual([-23, 15]);
    });
});
