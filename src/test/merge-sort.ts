
import assert = require("assert");
import {NumberArray} from "../util/number-array";
import {shuffle} from "../shuffle";
import {mergeSort} from "../merge-sort";

describe('Merge Sort', function () {

    it('should sort an array of numbers', function () {
        let originalList = Array.from(NumberArray.generate(100));
        Array.from(NumberArray.generate(10)).forEach(() => {
            let shuffled = shuffle(NumberArray.clone(originalList));
            assert(NumberArray.compare(Array.from(originalList), mergeSort(shuffled)), 'List should be sorted');
        });
    });

    it('should sort an array of numbers in descending order', function () {
        let originalList = Array.from(NumberArray.generate(100)).reverse();
        Array.from(NumberArray.generate(10)).forEach(() => {
            let shuffled = shuffle(NumberArray.clone(originalList));
            assert(NumberArray.compare(Array.from(originalList), mergeSort(shuffled, false)), 'List should be sorted');
        });
    });
});
