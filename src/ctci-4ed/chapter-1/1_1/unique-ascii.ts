
/**
 * Naive solution assuming only ASCii characters.
 *
 * Runs in O(n) but needs an auxiliary structure (the array, which is 256 characters long).
 *
 * @param str
 * @returns {boolean}
 */
export function uniqueAscii(str: string): boolean {
    let charsFound = Array(256).fill(0);
    let n = str.length;

    for (let i = 0; i < n; i++) {
        let charCode = str.charCodeAt(i);
        if (charsFound[charCode] > 0) return false;
        charsFound[charCode] = 1;
    }

    return true;
}
