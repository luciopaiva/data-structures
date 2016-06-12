
const DEFAULT_CAPACITY = 11;

export class Heap {

    private heap: number[];
    private isMinHeap: boolean;
    private capacity: number;
    public size: number;

    constructor (capacity: number = DEFAULT_CAPACITY, isMinHeap: boolean = true) {
        this.capacity = capacity;
        this.heap = Array(capacity);
        this.isMinHeap = isMinHeap;
        this.size = 0;
    }

    /**
     * Inserts a new element in the heap. The element is inserted at the last position of the underlying array, but then
     * immediately sifts up to the correct place.
     *
     * @param value
     */
    public insert(value: number) {
        this.size++;
        this.checkSize();

        let index;
        let parentIndex;

        // starts at the new last position of the underlying array and goes up
        for (index = this.size - 1; index != 0; index = parentIndex) {
            parentIndex = Heap.parentIndex(index);
            let parentValue = this.heap[parentIndex];

            if (this.check(parentValue, value)) {
                break;
            }

            this.heap[index] = parentValue;
        }

        this.heap[index] = value;
    }

    /**
     * Peeks at the lowest/highest priority, according to `this.isMinHeap`. Note that it doesn't remove the value from
     * the heap. Runs in O(1).
     *
     * @returns {number}
     */
    public peek(): number {
        return this.heap[0];
    }

    /**
     * Polls the lowest/highest priority value (according to `this.isMinHeap`), removing it from the heap and finally
     * re-balancing the structure to maintain its heap property. Runs in O(log n) because of the re-balancing operation.
     *
     * @returns {number}
     */
    public pop(): number {
        let result = this.heap[0];
        this.deleteAtIndex(0);
        return result;
    }

    /**
     * Checks if the contents of the underlying array satisfy the heap properties. This is only meant as a sanity check
     * method, as the heap will always preserve its property after any operation that is executed on it.
     *
     * Runs the check in O(n).
     *
     * @param index the index from where to start the check; defaults to the root of the tree
     * @returns {boolean} whether the heap is valid
     */
    public isValid(index: number = 0): boolean {
        let value = this.heap[index];

        let li = Heap.leftChildIndex(index);
        if (li < this.size) {
            let left = this.heap[li];
            // left child must have a lower priority and recursively so do its descendants
            if (!this.check(value, left) || !this.isValid(li)) return false;

            let ri = Heap.rightChildIndex(index);
            if (ri < this.size) {
                let right = this.heap[ri];
                // right child must have a lower priority and recursively so do its descendants
                if (!this.check(value, right) || !this.isValid(ri)) return false;
            }
        }

        // both child trees respect the heap property for this root node
        return true;
    }

    /**
     * Dumps a string with the contents of the heap, with each level in a separate line.
     *
     * @returns {string}
     */
    public toString(): string {
        let result = [];
        for (let i = 1; i < this.size; i <<= 1) {
            let level = [];
            let nextLevel = (i << 1) - 1;
            for (let j = i - 1; j < this.size && j < nextLevel; j++) {
                level.push(this.heap[j]);
            }
            result.push(level.join(' '));
        }
        return result.join('\n');
    }

    /**
     * Removes item at position `index`. Upon removing it, the method sifts up its descendants until the heap property
     * is re-established. For every descendant, the algorithm compares it with the last element in the underlying array.
     * When the last element has a lower/higher priority than the current descendant, the algorithm stops and moves the
     * last element to the vacant position, instead of sifting up that descendant.
     *
     * Another way to do it would be to move the last element to the position of the removed element right away, and
     * then sift it down accordingly.
     *
     * @param index
     */
    private deleteAtIndex(index: number) {
        if (index >= this.size) return;

        let last = this.heap[this.size - 1];  // get the last element in the underlying array
        this.size--;

        let childIndex = Heap.leftChildIndex(index);

        while (childIndex < this.size) {

            if (childIndex + 1 < this.size) {
                // there is also a right child - finds which of the two must be sifted up (if any)
                childIndex += this.check(this.heap[childIndex + 1], this.heap[childIndex]) ? 1 : 0;
            }

            // if both left/right children have lower priority than the last element, this is where we're gonna insert
            // the last element; stop here
            if (this.check(last, this.heap[childIndex])) break;

            // sift child up
            this.heap[index] = this.heap[childIndex];
            index = childIndex;

            childIndex = Heap.leftChildIndex(index);
        }

        // insert the last element at the designated position
        this.heap[index] = last;
    }

    /**
     * Checks if `this.size` is bigger than current capacity. If so, it doubles the size of the underlying array and
     * copies the contents of the old structure to the new one.
     */
    private checkSize() {
        if (this.size > this.capacity) {
            this.capacity *= 2;
            let newHeap = Array(this.capacity);
            // the last item is probably not initialized yet - `undefined` will be copied instead, but that's ok
            for (let i = 0; i < this.size; i++) {
                newHeap[i] = this.heap[i];
            }
            this.heap = newHeap;
        }
    }

    /**
     * Checks if the heap property is respected between parent and child values. Takes into account `this.isMinHeap` to
     * do the check.
     *
     * @param parent the value of the parent node
     * @param child the value of the child node
     * @returns {boolean} whether the heap property is respected between them
     */
    private check(parent, child): boolean {
        return this.isMinHeap ? parent <= child : parent >= child;
    }

    /**
     * Given an index, returns the index of its parent node.
     *
     * @param index
     * @returns {number}
     */
    private static parentIndex(index: number): number {
        return (index - 1) >> 1;
    }

    /**
     * Given an index, returns the index of its left child.
     *
     * @param parentIndex
     * @returns {number}
     */
    private static leftChildIndex(parentIndex: number) {
        return (parentIndex << 1) + 1;
    }

    /**
     * Given an index, returns the index of its right child.
     *
     * @param parentIndex
     * @returns {number}
     */
    private static rightChildIndex(parentIndex: number) {
        return (parentIndex << 1) + 2;
    }
}

export class MinHeap extends Heap {
    constructor (capacity: number = DEFAULT_CAPACITY) {
        super(capacity, true);
    }
}

export class MaxHeap extends Heap {
    constructor (capacity: number = DEFAULT_CAPACITY) {
        super(capacity, false);
    }
}
