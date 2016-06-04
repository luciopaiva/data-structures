
import assert = require("assert");
import {RemoveDuplicates} from "../../../ctci-4ed/chapter-1/1_3";

describe('Problem 1.3', function () {
    it('should remove duplicate characters', function () {
        let input = 'abbcdebefa';
        let expected = 'abcdef';
        let result = RemoveDuplicates.simple(input);
        assert.equal(result, expected, `did not remove duplicates correctly (result was "${result}", should be "${expected}")`);
    });
});
