
import assert = require("assert");
import {HashSet} from "../hast-set";
import {NumberArray} from "../util/number-array";

describe('Hash Set', function () {

    it('should store only unique numbers', function () {
        let hashSet = new HashSet<number>();

        hashSet.add(-1);
        hashSet.add(-1);
        hashSet.add(1);
        hashSet.add(1);
        hashSet.add(1.1);
        hashSet.add(1.1);
        hashSet.add(2);
        hashSet.add(2);

        assert.strictEqual(hashSet.size(), 4);
    });

    it('should eliminate duplicates from an array of numbers', function () {
        let hashSet = new HashSet<number>();
        let uniques = [-2, -1, 0, 20, 32, 50].sort();
        let duplicates = [-1, 0, 20, 20, 32, 20, 32, 50, -1, -2];

        hashSet.add(...duplicates);
        assert.strictEqual(hashSet.size(), 6);

        let result = [...hashSet].sort();
        NumberArray.zip(uniques, result).forEach(pair => assert.strictEqual(pair[0], pair[1]));
    });
});
