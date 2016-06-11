
/**
 * For each character, check all the other characters to the right for uniqueness.
 *
 * Similar to a selection sort, both in complexity - O(n^2) - and for not using extra structures.
 *
 * @param str
 */
export function uniqueQuadratic(str: string) {
    let n = str.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            if (str[i] === str[j]) {
                return false;
            }
        }
    }
    return true;
}
