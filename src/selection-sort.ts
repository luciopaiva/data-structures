
/**
 * Performs an in-place selection sort.
 *
 * @param list the list to be sorted
 * @returns {number[]} the same input list, sorted, returned just for convenience
 */
export function selectionSort(list: number[]): number[] {
    let N = list.length;

    for (let i = 0; i < N; i++) {
        let minVal = list[i];
        let minIndex = i;

        // find minimum item among [i, N[ items
        for (let j = i + 1; j < N; j++) {
            if (list[j] < minVal) {
                minVal = list[j];
                minIndex = j;
            }
        }

        // swap
        let t = list[i];
        list[i] = minVal;
        list[minIndex] = t;
    }

    return list;
}
