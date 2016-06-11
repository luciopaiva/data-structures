
import assert = require("assert");
import { uniqueWithMap } from "../../../ctci-4ed/chapter-1/1_1/unique-with-map";
import { uniqueAscii } from "../../../ctci-4ed/chapter-1/1_1/unique-ascii";
import { uniqueQuadratic } from "../../../ctci-4ed/chapter-1/1_1/unique-quadratic";

describe('Problem 1.1', function () {
    describe('Solution using a map', function () {
        it('should pass with only unique characters', function () {
            assert(uniqueWithMap('abcde'), 'wrongly reported duplicate characters');
        });

        it('should fail with duplicate characters', function () {
            assert(!uniqueWithMap('abcda'), 'wrongly reported unique characters');
        });
    });

    describe('Solution using an auxiliary array', function () {
        it('should pass with only unique characters', function () {
            assert(uniqueAscii('abcde'), 'wrongly reported duplicate characters');
        });

        it('should fail with duplicate characters', function () {
            assert(!uniqueAscii('abcda'), 'wrongly reported unique characters');
        });
    });

    describe('Solution traversing the array twice', function () {
        it('should pass with only unique characters', function () {
            assert(uniqueQuadratic('abcde'), 'wrongly reported duplicate characters');
        });

        it('should fail with duplicate characters', function () {
            assert(!uniqueQuadratic('abcda'), 'wrongly reported unique characters');
        });
    });

});
