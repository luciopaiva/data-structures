
import {NumberArray} from "./util/number-array";
/**
 * Performs an in-place selection sort.
 *
 * @param list the list to be sorted
 * @returns {number[]} the same input list, sorted, returned just for convenience
 */
export function selectionSort(list: number[]): number[] {
    let N = list.length;

    for (let i = 0; i < N; i++) {
        let min = i;

        // find minimum item among [i, N[ items
        for (let j = i + 1; j < N; j++) {
            if (list[j] < list[min]) {
                min = j;
            }
        }

        // swap
        NumberArray.swap(list, i, min);
    }

    return list;
}
