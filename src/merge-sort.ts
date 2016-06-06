
/**
 * Merge sort algorithm.
 *
 * O(n log n) running time, but uses several auxiliary lists during the sorting process.
 *
 * The idea is to divide and conquer, which corresponds to the "log n" part of its complexity. The algorithm breaks the
 * list into n lists, where n is the number of items in the original array. Each individual list is, by definition,
 * already sorted. The algorithm then starts merging adjacent lists, taking advantage of the fact that they are already
 * sorted.
 *
 * @param list the list to be sorted
 * @param ascending whether the sorting should be ascending
 * @returns the sorted list
 */
export function mergeSort(list: number[], ascending: boolean = true): number[] {
    let N = list.length;

    if (N == 1) {
        return list;
    }

    // divide...
    let middlePos = Math.floor(N/2);
    let left = mergeSort(list.slice(0, middlePos), ascending);
    let right = mergeSort(list.slice(middlePos), ascending);

    // ...and conquer
    return merge(left, right, ascending);
}

/**
 * Merges two already sorted lists into a single sorted list.
 *
 * @param left
 * @param right
 * @param ascending
 */
function merge(left: number[], right: number[], ascending: boolean = true): number[] {
    let result = [];
    let N = left.length + right.length;
    let li = 0;
    let ri = 0;
    while (result.length < N) {
        let item;
        let ln = left[li];
        let rn = right[ri];
        if (ln === undefined) {
            item = rn;
            ri++;
        } else if (rn === undefined) {
            item = ln;
            li++;
        } else if (ascending ? ln < rn : ln > rn) {
            item = ln;
            li++;
        } else {
            item = rn;
            ri++;
        }
        result.push(item);
    }
    return result;
}
