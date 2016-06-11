
/**
 * Remove duplicate characters from a given string.
 * Should not create an extra array during the operation.
 *
 * Runs in O(n^3). For each selected char, it checks all following chars for duplicates. If it finds a duplicate, the
 * function runs a third loop, bubbling up each following char with the current one and decreasing the string length by
 * 1.
 */
export function removeDuplicatesCubic(str: string): string {
    let N = str.length;
    let result = Array.from(str);  // needs to convert to array to be able to operate on it

    for (let i = 0; i < N - 1; i++) {
        for (let j = i + 1; j < N; j++) {
            if (result[j] === result[i]) {
                // found a duplicate - let's shift the remaining substring one char to the left
                for (let k = j; k < N - 1; k++) {
                    result[k] = result[k+1];
                }
                N--;
            }
        }
    }

    return result.slice(0, N).join('');  // slice() gets rid of the garbage left at the end of the string
}
