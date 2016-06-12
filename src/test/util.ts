
import assert = require("assert");
import {NumberArray} from "../util/number-array";
import {Random} from "../util/random";

describe('Util functions', function () {

    describe('Is sorted', function () {
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

    describe('Random', function () {
        it('should generate same sequence for the same seed', function () {
            let r1 = new Random(42);
            let r2 = new Random(42);
            for (let i = 0; i < 100; i++) {
                assert.strictEqual(r1.next(), r2.next());
            }
        });

        it('should generate different sequences with different seeds', function () {
            let r1 = new Random(42);
            let r2 = new Random(43);
            for (let i = 0; i < 100; i++) {
                // it turns out that none of the generated values from each sequence with seeds 42 and 43 match
                assert(r1.next() != r2.next());
            }
        });
    });
});
