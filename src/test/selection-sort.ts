
import assert = require("assert");
import {NumberArray} from "../util/number-array";
import {shuffle} from "../shuffle";
import {selectionSort} from "../selection-sort";

describe('Selection Sort', function () {
    it('should sort an array of numbers', function () {
        let originalList = NumberArray.generate(100);
        let shuffled = shuffle(NumberArray.clone(originalList));
        assert(NumberArray.compare(originalList, selectionSort(shuffled)), 'List should be sorted');
    });
});
