
import assert = require("assert");
import {NumberArray} from "../util/number-array";
import {LinkedList} from "../linked-list";
import {ArrayUtil} from "../util/array-util";

describe('Linked List', function () {

    let numbers = [...NumberArray.generate(10)].map(i => Math.floor(100 * Math.random()));

    it('method `size` should match number of items returned when used as iterable', function () {
        let linkedList = new LinkedList<number>();
        numbers.forEach(n => linkedList.add(n));

        assert.strictEqual(linkedList.size(), [...linkedList].length);
    });

    it('should correctly add new items to the list', function () {
        let linkedList = new LinkedList<number>();
        numbers.forEach(n => linkedList.add(n));

        assert.strictEqual(numbers.length, linkedList.size(),
            `Wrong number of items in the linked list (${linkedList.size()}, should be ${numbers.length})`);

        NumberArray.zip(numbers, Array.from(linkedList)).forEach((pair: [number, number]) => {
            assert.strictEqual(pair[0], pair[1], `Found item ${pair[1]}, expected ${pair[0]}`);
        });
    });
    
    it('should correctly remove items from the list', function () {
        let linkedList = new LinkedList<number>();

        // remove single element (it's both the head and the tail)
        linkedList.add(13);
        assert.strictEqual(linkedList.remove(0), 13);

        // remove from the middle of the list
        linkedList.add(13, 25, 42);
        assert.strictEqual(linkedList.remove(1), 25);
        assert.strictEqual(linkedList.size(), 2);
        assert.strictEqual(linkedList.remove(0), 13);
        assert.strictEqual(linkedList.remove(0), 42);

        // remove using negative index
        linkedList.add(13, 25, 42);
        assert.strictEqual(linkedList.remove(-3), 13);
        assert.strictEqual(linkedList.remove(-2), 25);
        assert.strictEqual(linkedList.remove(-1), 42);
    });

    it('should work with strings too', function () {
        let linkedList = new LinkedList<string>();
        let strings = ['foo', 'bar'];

        linkedList.add(...strings);

        ArrayUtil.zip(strings, Array.from(linkedList))
            .forEach((pair: [string, string]) => assert.strictEqual(pair[0], pair[1]));
    });
});
