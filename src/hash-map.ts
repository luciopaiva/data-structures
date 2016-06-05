
import {LinkedList} from "./linked-list";

const LOAD_FACTOR = .75;
const DEFAULT_INITIAL_SIZE = 16;

class Entry<K, V> {
    public key: K;
    public value: V;

    constructor (key: K, value: V) {
        this.key = key;
        this.value = value;
    }

    public toString(): string {
        let value = this.value !== null ? this.value.toString() : 'null';
        return this.key.toString() + ':' + value;
    }
}

/**
 * A simple hash map implementation.
 *
 * Each bucket holds a linked list of items that hash into that bucket.
 */
export class HashMap<K, V> implements Iterable<Entry<K, V>> {

    private loadFactor: number;
    /** current capacity of the map */
    private _capacity: number;
    private buckets: LinkedList<Entry<K, V>>[];
    /** number of items currently in the map */
    private _size: number;

    constructor (initialCapacity: number = DEFAULT_INITIAL_SIZE, loadFactor: number = LOAD_FACTOR) {
        this.loadFactor = loadFactor;

        // capacity must be power of 2 - find the first greater than the requested size
        let powerOfTwoCapacity = 1;
        while (powerOfTwoCapacity < initialCapacity) {
            powerOfTwoCapacity <<= 1;
        }
        this._capacity = powerOfTwoCapacity;

        this._size = 0;
        this.buckets = Array(this._capacity);
    }

    private hash(key: K): number {
        if (typeof key !== 'number') {
            throw new Error('Currently, only numbers are supported as keys');
        }
        return Math.abs(Math.round(key as any));
    }

    private hashToPosition(hashCode: number): number {
        return hashCode % this._capacity;
    }

    private increaseCapacity(): void {
        let newHashMap = new HashMap<K, V>(this._capacity << 1, this.loadFactor);
        for (let entry of this) newHashMap.put(entry.key, entry.value);
        this.copyFrom(newHashMap);
    }

    private copyFrom(other: HashMap<K, V>): void {
        this._capacity = other._capacity;
        this._size = other._size;
        this.loadFactor = other.loadFactor;
        this.buckets = other.buckets;
    }

    private find(key: K): Entry<K, V> {
        let position = this.hashToPosition(this.hash(key));
        let bucket = this.buckets[position];

        if (bucket instanceof LinkedList) {
            for (let item of bucket) {
                if (item.key === key) {  // ToDo implement equality for any kind of key, not just numbers
                    return item;
                }
            }
        }

        return null;
    }

    public contains(key: K): boolean {
        let item = this.find(key);
        return item !== null;
    }

    public put(key: K, value: V): void {
        let item = this.find(key);

        if (item !== null) {
            item.value = value;
        } else {
            // console.info(`Size: ${this._size}, capacity: ${this._capacity}, load: ${this._size / this._capacity}`);
            if ((this._size+1) / this._capacity > this.loadFactor) {
                this.increaseCapacity();
            }

            let position = this.hashToPosition(this.hash(key));
            let entry = new Entry<K, V>(key, value);
            if (!(this.buckets[position] instanceof LinkedList)) {
                this.buckets[position] = new LinkedList<Entry<K, V>>();
            }
            this.buckets[position].add(entry);
            this._size++;
        }
    }

    public get(key: K): V {
        let item = this.find(key);
        return item !== null ? item.value : null;
    }

    public remove(key: K): V {
        let position = this.hashToPosition(this.hash(key));
        let bucket = this.buckets[position];

        if (bucket instanceof LinkedList) {
            let index = 0;
            for (let item of bucket) {
                if (item.key === key) {
                    bucket.remove(index);
                    this._size--;
                    return item.value;
                }
                index++;
            }
        }

        return null;
    }

    public toString(): string {
        let result = [];
        for (let i = 0; i < this._capacity; i++) {
            let bucketContents = this.buckets[i] instanceof LinkedList ? this.buckets[i].toString() : '';
            result.push(`Bucket ${i}: ${bucketContents}`);
        }
        return result.join('\n');
    }

    [Symbol.iterator]():Iterator<Entry<K, V>> {
        let curBucketIndex = 0;
        let curListIndex = 0;
        return {
            next: () => {
                let done = true;
                let value = null;

                while (curBucketIndex < this._capacity) {
                    let bucket = this.buckets[curBucketIndex];

                    if (bucket instanceof LinkedList) {
                        if (curListIndex < bucket.size()) {
                            done = false;
                            value = bucket.get(curListIndex);
                            curListIndex++;
                            break;
                        }
                    }

                    curBucketIndex++;
                    curListIndex = 0;
                }

                return {
                    done: done,
                    value: value
                };
            }
        };
    }

    public *keys(): IterableIterator<K> {
        for (let item of this) {
            yield item.key;
        }
    }

    public *values(): IterableIterator<V> {
        for (let item of this) {
            yield item.value;
        }
    }

    public size(): number {
        return this._size;
    }
}
