
import {HashMap} from "./hash-map";

export class HashSet<K> implements Iterable<K> {

    private map: HashMap<K, any>;

    constructor (initialCapacity?: number, loadFactor?: number) {
        this.map = new HashMap<K, any>(initialCapacity, loadFactor);
    }

    public add(...keys: K[]): void {
        keys.forEach(key => this.map.put(key, null));
    }

    public contains(key: K): boolean {
        return this.map.contains(key);
    }

    public remove(key: K): void {
        this.map.remove(key);
    }

    public size(): number {
        return this.map.size();
    }

    [Symbol.iterator](): Iterator<K> {
        return this.map.keys();
    }

    public toString(): string {
        return this.map.toString();
    }
}
