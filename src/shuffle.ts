
import {NumberArray} from "./util/number-array";

/**
 * Performs an in-place shuffling of the list of numbers.
 *
 * @param list the list of numbers
 * @returns {number[]} a reference to the input list, for convenience
 */
export function shuffle(list: number[]): number[] {
    let N = list.length;
    for (let i = 0; i < N; i++) {
        let otherIndex = Math.floor(Math.random() * N);
        NumberArray.swap(list, i, otherIndex);
    }
    return list;
}
