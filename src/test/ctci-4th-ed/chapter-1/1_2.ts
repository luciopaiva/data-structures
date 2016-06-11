
import assert = require("assert");
import {reverse} from "../../../ctci-4ed/chapter-1/1_2/reverse";

describe('Problem 1.2', function () {
    it('should reverse "abcd"', function () {
        let result = reverse('abcd');
        assert(result, `did not reverse string correctly (result was "${result}", should be "abcd")`);
    });
});
