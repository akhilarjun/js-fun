import { assert, describe, it } from "./assert.js";

let findEdgesOfIsland
    = (input, x, y, minX, minY, maxX, maxY) => {
        if (x < minX) {
            minX = x;
        }
        if (x > maxX) {
            maxX = x;
        }
        if (y < minY) {
            minY = y;
        }
        if (y > maxY) {
            maxY = y;
        }
        input[y][x] = '#';
        //check left
        if (x > 0) {
            if (input[y][x - 1] === 1) {
                [minX, minY, maxX, maxY]
                    = findEdgesOfIsland(
                        input, x - 1, y, minX, minY, maxX, maxY
                    );
            }
        }
        //check top
        if (y > 0) {
            if (input[y - 1][x] === 1) {
                [minX, minY, maxX, maxY]
                    = findEdgesOfIsland(
                        input, x, y - 1, minX, minY, maxX, maxY
                    );
            }
        }
        //check right
        if (x < input[y].length - 1) {
            if (input[y][x + 1] === 1) {
                [minX, minY, maxX, maxY]
                    = findEdgesOfIsland(
                        input, x + 1, y, minX, minY, maxX, maxY
                    );
            }
        }
        //check bottom
        if (y < input.length - 1) {
            if (input[y + 1][x] === 1) {
                [minX, minY, maxX, maxY]
                    = findEdgesOfIsland(
                        input, x, y + 1, minX, minY, maxX, maxY
                    );
            }
        }
        return [minX, minY, maxX, maxY];
    }
let isWater = (input, i, j) => {
    return input[i][j] === 0 ? true : false;
}
let treatLake = (input, i, j, minX, minY, maxX, maxY) => {
    input[i][j] = '+';
    if (j > minX) {
        isWater(input, i, j - 1) ?
            treatLake(input, i, j - 1, minX, minY, maxX, maxY)
            : true;
    }
    if (i > minY) {
        isWater(input, i - 1, j) ?
            treatLake(input, i - 1, j, minX, minY, maxX, maxY)
            : true;
    }
    if (j < maxX) {
        isWater(input, i, j + 1) ?
            treatLake(input, i, j + 1, minX, minY, maxX, maxY)
            : true;
    }
    if (i < maxY) {
        isWater(input, i + 1, j) ?
            treatLake(input, i + 1, j, minX, minY, maxX, maxY)
            : true;
    }
}
let findNumOfOceans = (input, x, y) => {
    let numOflakes = 0;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    if (!input[y] || input[y][x] === undefined) {
        return -1;
    }

    // if clicked on lake
    // find land pixel
    if (input[y][x] != 1) {
        while (y > 0) {
            y--;
            if (input[y][x] === 1) {
                break;
            }
        }
    }
    [minX, minY, maxX, maxY]
        = findEdgesOfIsland(input, x, y, minX, minY, maxX, maxY);
    for (let i = minY; i <= maxY; i++) {
        for (let j = minX; j <= maxX; j++) {
            if (isWater(input, i, j)) {
                numOflakes++;
                treatLake(input, i, j, minX, minY, maxX, maxY);
            }
        }
    }
    return numOflakes;
};

describe('Lake in Island Algorithm', () => {
    it('should return proper number of lakes in a given island = 2', () => {
        let input = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 1, 0, 0]
        ];
        assert(findNumOfOceans, [input, 6, 5]).toEqual(2);
    });
    it('should return proper number of lakes in a given island = 1', () => {
        let input = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 1, 0, 0]
        ];
        assert(findNumOfOceans, [input, 1, 6]).toEqual(1);
    });
    it('should return proper number of lakes in a given island = 0', () => {
        let input = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 1, 0, 0]
        ];
        assert(findNumOfOceans, [input, 7, 7]).toEqual(0);
    });
    it('should return -1 when clicked outside the map', () => {
        let input = [1, 1]
        assert(findNumOfOceans, [input, 20, 5]).toEqual(-1);
    });
});
