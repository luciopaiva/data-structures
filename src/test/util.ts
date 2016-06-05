
import assert = require("assert");
import {NumberArray} from "../util/number-array";

describe('Util functions', function () {

    it('should successfully verify a sorted list', function () {
        let sorted = [-5, 0, 10, 11, 40, 50, 1000, Number.POSITIVE_INFINITY];
        assert(NumberArray.isSorted(sorted));
    });

    it('should successfully verify a sorted list in descending order', function () {
        let sorted = [-5, 0, 10, 11, 40, 50, 1000].reverse();
        assert(NumberArray.isSorted(sorted, false));
    });

    it('should detect an unsorted list', function () {
        let unsorted = [-5, 0, -4, 10, 11, 40, 50, 1000];
        assert.strictEqual(NumberArray.isSorted(unsorted), false);
    });

    it('an empty list should be interpreted as sorted', function () {
        assert(NumberArray.isSorted([]));
    });

    it('a single-element list should be interpreted as sorted', function () {
        assert(NumberArray.isSorted([1]));
    });

});
