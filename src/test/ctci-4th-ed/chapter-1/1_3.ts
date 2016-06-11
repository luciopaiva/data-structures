
import assert = require("assert");
import {removeDuplicatesCubic} from "../../../ctci-4ed/chapter-1/1_3/remove-duplicates-cubic";

describe('Problem 1.3', function () {
    it('should remove duplicate characters', function () {
        let input = 'abbcdebefa';
        let expected = 'abcdef';
        let result = removeDuplicatesCubic(input);
        assert.equal(result, expected, `did not remove duplicates correctly (result was "${result}", should be "${expected}")`);
    });
});
