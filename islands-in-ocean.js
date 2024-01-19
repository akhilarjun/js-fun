import { assert, describe, it } from "./assert.js";

let processIsland = (arr, i, j) => {
    arr[i][j] = '#';
    // check left
    if (j > 0) {
        if (arr[i][j - 1] === 1) {
            processIsland(arr, i, j - 1);
        }
    }
    //check top
    if (i > 0) {
        if (arr[i - 1][j] === 1) {
            processIsland(arr, i - 1, j);
        }
    }
    //check right
    if (j < arr[i].length - 1) {
        if (arr[i][j + 1] === 1) {
            processIsland(arr, i, j + 1);
        }
    }
    //check bottom
    if (i < arr.length - 1) {
        if (arr[i + 1][j] === 1) {
            processIsland(arr, i + 1, j);
        }
    }
}
let findNumOfIslands = (input) => {
    let islandCounter = 0;
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] === 1) {
                islandCounter++;
                processIsland(input, i, j);
            }
        }
    }
    return islandCounter;
}

describe('Islands in Ocean Algorithm', () => {
    it('should return proper number of islands = 5', () => {
        let input = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
            [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 0, 1, 0, 1]
        ];
        assert(findNumOfIslands, [input]).toEqual(5);
    });

    it('should return proper number of islands = 3', () => {
        let input = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
            [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 0, 0, 0, 0]
        ];
        assert(findNumOfIslands, [input]).toEqual(3);
    });

    it('should return proper number of islands = 2', () => {
        let input = [
            [0, 1, 1, 1, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 0],
            [0, 1, 0, 1, 0, 1, 1]
        ];
        assert(findNumOfIslands, [input]).toEqual(2);
    });
});