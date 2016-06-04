
class Entry<T> {
    public value: T;
    public previous: Entry<T>;
    public next: Entry<T>;

    constructor (value: T) {
        this.value = value;
        this.previous = null;
        this.next = null;
    }
}

/**
 * A doubly linked list with some cool features:
 *
 * - lets you `add()` more than one value at once
 * - lets you `remove()` from the tail by using negative indices
 * - implements the iterable protocol, so you can iterate over it using for..of constructions
 */
export class LinkedList<T> implements Iterable<T> {

    private head: Entry<T>;
    private tail: Entry<T>;
    private _size: number;

    constructor () {
        this.head = null;
        this.tail = null;
        this._size = 0;
    }

    /**
     * @param items one or more values to add to the list, inserted in the exact order as informed
     */
    public add(...items: T[]): void {
        items.forEach(item => {
            let entry = new Entry<T>(item);

            if (this.head === null) {
                this.tail = this.head = entry;
            } else {
                this.tail.next = entry;
                entry.previous = this.tail;
                this.tail = entry;
            }
        });

        this._size += items.length;
    }

    /**
     * Removes an item from the linked list, returning the removed item or null if the position is out of bounds.
     *
     * @param atPosition position of the item to be removed. If negative, removes from the tail (-1 removes the last
     *                   item, -2 the second to last, an so on.
     */
    public remove(atPosition: number): T {

        let forward = atPosition >= 0;

        if (!forward) {
            atPosition = Math.abs(atPosition + 1);
        }

        if (atPosition >= this._size) {
            return null;  // out of bounds
        }

        let hopsToGo = atPosition;

        let previous = null;
        let current = forward ? this.head : this.tail;

        if (hopsToGo === 0) {
            // removing either the head or the tail
            if (forward) {
                this.head = this.head.next;
            } else {
                this.tail = this.tail.previous;
            }
        } else {
            while (hopsToGo > 0) {
                previous = current;
                current = forward ? current.next : current.previous;
                hopsToGo--;
            }

            if (forward) {
                previous.next = current.next;
            } else {
                previous.previous = current.previous;
            }

            // fix the head in case we removed the first item
            if (current === this.head) {
                this.head = previous;
            }

            // fix the tail in case we removed the last item
            if (current === this.tail) {
                this.tail = previous;
            }
        }

        this._size--;

        return current.value;
    }

    public size(): number {
        return this._size
    };

    public [Symbol.iterator](): Iterator<T> {
        let current = this.head;
        return {
            next: () => {
                let done = current === null;
                let value;
                if (!done) {
                    value = current.value;
                    current = current.next;
                }
                return {
                    done: done,
                    value: value
                };
            }
        };
    }
}
