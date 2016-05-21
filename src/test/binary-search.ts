
import assert = require("assert");
import {BinarySearch} from "../binary-search";
import {NumberArray} from "../util/number-array";

describe('Binary Search', function () {
    
    it('should find given item', function () {
        let N = 20;
        let MAX_STEP = 10;
        let getRandomNumber = () => 1 + Math.floor(Math.random() * MAX_STEP);
        
        let list = NumberArray.generate(N, getRandomNumber(), getRandomNumber);

        let selectedIndex = Math.floor(Math.random() * N);
        let itemToBeFound = list[selectedIndex];
        let result = BinarySearch.rank(itemToBeFound, list);
        assert.equal(list[selectedIndex], itemToBeFound, `Found ${list[selectedIndex]} at position ${result} instead ` +
            `of intended ${itemToBeFound}.`)
    });
});
