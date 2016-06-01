
import assert = require("assert");
import {OnlyUniqueCharacters} from "../../../ctci-4ed/chapter-1/1_1";

describe('Cracking the Coding Interview', function () {
    describe('Chapter 1 - Arrays and Strings', function () {
        describe('Problem 1.1', function () {
            describe('Solution using a map', function () {
                it('should pass with only unique characters', function () {
                    assert(OnlyUniqueCharacters.checkByUsingMap('abcde'), 'wrongly reported duplicate characters');
                });

                it('should fail with duplicate characters', function () {
                    assert(!OnlyUniqueCharacters.checkByUsingMap('abcda'), 'wrongly reported unique characters');
                });
            });

            describe('Solution using an auxiliary array', function () {
                it('should pass with only unique characters', function () {
                    assert(OnlyUniqueCharacters.checkUsingArray('abcde'), 'wrongly reported duplicate characters');
                });

                it('should fail with duplicate characters', function () {
                    assert(!OnlyUniqueCharacters.checkUsingArray('abcda'), 'wrongly reported unique characters');
                });
            });

            describe('Solution traversing the array twice', function () {
                it('should pass with only unique characters', function () {
                    assert(OnlyUniqueCharacters.checkByTraversingTwice('abcde'), 'wrongly reported duplicate characters');
                });

                it('should fail with duplicate characters', function () {
                    assert(!OnlyUniqueCharacters.checkByTraversingTwice('abcda'), 'wrongly reported unique characters');
                });
            });

        });
    });
});
