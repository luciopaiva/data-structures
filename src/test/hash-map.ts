
import assert = require("assert");
import {HashMap} from "../hash-map";
import {NumberArray} from "../util/number-array";

describe('Hash Map', function () {

    it('should be able to put and get items', function () {
        let map = new HashMap<number, string>();

        map.put(1, 'foo');
        map.put(1.1, 'foo2');
        map.put(2, 'bar');

        assert.strictEqual(map.get(1.1), 'foo2');
        assert.strictEqual(map.get(2), 'bar');
        assert.strictEqual(map.get(3), null);
    });

    it('should be able to remove items', function () {
        let map = new HashMap<number, string>();

        map.put(1, 'foo');
        map.put(1.1, 'foo2');
        map.put(2, 'bar');
        assert.strictEqual(map.size(), 3);
        let removedItem = map.remove(1);
        assert.strictEqual(map.size(), 2);

        assert.strictEqual(map.get(2), 'bar');
        assert.strictEqual(map.get(1), null);
        assert.strictEqual(removedItem, 'foo');
    });

    it('should not duplicate keys', function () {
        let map = new HashMap<number, number>();
        map.put(1, 123);
        assert.strictEqual(map.size(), 1);
        assert.strictEqual(map.get(1), 123);
        map.put(1, 456);
        assert.strictEqual(map.size(), 1);
        assert.strictEqual(map.get(1), 456);
    });

    it('should be able to increase capacity', function () {
        let initialCapacity = 16;
        let loadFactor = .75;
        let map = new HashMap<number, number>(initialCapacity, loadFactor);
        let N = Math.ceil(initialCapacity * loadFactor) + 1;  // make sure to force an increase in the map size
        let MAX_STEP = 10;
        let getRandomNumber = () => 1 + Math.floor(Math.random() * MAX_STEP);
        let numbers = Array.from(NumberArray.generate(N, getRandomNumber(), getRandomNumber));

        numbers.forEach(n => map.put(n, n));
        assert.strictEqual(N, map.size());
        numbers.forEach(n => assert.strictEqual(n, map.get(n)));
    });
});
