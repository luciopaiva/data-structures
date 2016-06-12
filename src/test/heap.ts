
import assert = require("assert");
import {NumberArray} from "../util/number-array";
import {MinHeap, MaxHeap} from "../heap";

describe('Heap', function () {

    let numbers = [...NumberArray.generate(1+2+4+8+16+32)].map(i => Math.floor(100 * Math.random()));

    it('should be able to add elements to the heap', function () {
        let heap = new MinHeap();
        numbers.forEach(n => heap.insert(n));

        assert.strictEqual(numbers.length, heap.size);
        assert(heap.isValid());
    });

    it('should be able to remove elements from the tip of the min heap', function () {
        let heap = new MinHeap();
        let tenNumbers = [...NumberArray.generate(10)];

        tenNumbers.reverse().forEach(n => heap.insert(n));  // reverse just to spice things up

        let previous = null;
        for (let i = 0; i < tenNumbers.length; i++) {
            let value = heap.peek();

            // check if peek() and pop() agree on each other
            assert.strictEqual(value, heap.pop());

            if (previous != null) {
                // check if current value is greater than the previous one
                assert(previous <= value, `Min-heap popped ${value} after ${previous}!`);
            }
            previous = value;
        }
    });

    it('should be able to remove elements from the tip of the max heap', function () {
        let heap = new MaxHeap();
        let tenNumbers = [...NumberArray.generate(10)];

        tenNumbers.reverse().forEach(n => heap.insert(n));  // reverse just to spice things up

        let previous = null;
        for (let i = 0; i < tenNumbers.length; i++) {
            let value = heap.peek();

            // check if peek() and pop() agree on each other
            assert.strictEqual(value, heap.pop());

            if (previous != null) {
                // check if current value is greater than the previous one
                assert(previous >= value, `Max-heap popped ${value} after ${previous}!`);
            }
            previous = value;
        }
    });

    it('should correctly grow the underlying array when size needs to be increased', function () {
        let heap = new MaxHeap(10);
        let tenNumbers = [...NumberArray.generate(10)];
        tenNumbers.forEach(n => heap.insert(n));
        assert.strictEqual(heap.size, 10);
        assert(heap.isValid());
        tenNumbers.forEach(n => heap.insert(n));
        assert.strictEqual(heap.size, 20);
        assert(heap.isValid());
        assert.strictEqual(heap.pop(), 9);
    });
});
