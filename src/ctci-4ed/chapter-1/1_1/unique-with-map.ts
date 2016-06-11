
/**
 * Use a map to count the occurrences of each character.
 *
 * Runs in O(n) but needs an auxiliary structure (the map).
 *
 * @param str
 */
export function uniqueWithMap(str: string): boolean {
    let charsFound = {} as { string : boolean };
    let n = str.length;

    for (let i = 0; i < n; i++) {
        let c = str[i];
        if (c in charsFound) return false;
        charsFound[c] = true;
    }

    return true;
}
