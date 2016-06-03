
import assert = require("assert");
import {FizzBuzz} from "../fizz-buzz";

describe('FizzBuzz', function () {

    it('should not struggle with tiny problems!', function () {
        let expected =
            ['FizzBuzz', '1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14'];

        let result = FizzBuzz.run(expected.length);

        assert.equal(expected.length, result.length,
            `Array size doesn't match expected one (${result.length} instead of ${expected.length})`);

        let match = expected.every((item, i) => item == result[i]);
        assert(match, 'Result does not match what was expected');
    });
});
