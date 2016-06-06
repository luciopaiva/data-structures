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

/**
 * Merge sort algorithm.
 *
 * - runs in O(n log n) time
 * - needs auxiliary structures to do the sorting
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

    let middlePos = Math.floor(N/2);
    let left = mergeSort(list.slice(0, middlePos), ascending);
    let right = mergeSort(list.slice(middlePos), ascending);
    // console.info(`[${list.join(', ')}] => [${left.join(', ')}], [${right.join(', ')}]`);

    return merge(left, right, ascending);
}
