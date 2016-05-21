
import assert = require("assert");
import {shuffle} from "../shuffle";

describe('Shuffle', function () {
    it('should shuffle an array of numbers', function () {
        // the chance that the shuffle ends with the same initial ordered array is of 1:N!, so that's the chance of this
        // test giving a false negative :-)

        let N = 100;
        let list = [];
        for (let i = 0; i < N; i++) {
            list.push(i);
        }

        shuffle(list);

        let isEqual = true;
        for (let i = 0; i < list.length; i++) {
            if (i != list[i]) {
                isEqual = false;
                break;
            }
        }

        assert(!isEqual, "Arrays should not be equal after shuffling (ok, there's a slight possibility that it could).");
    });
});
