
/**
 * Different implementations for solving the same problem: checking if a string contains only unique characters.
 */
export class OnlyUniqueCharacters {

    /**
     * Use a map to count the occurrences of each character.
     *
     * @param str
     */
    public static checkByUsingMap(str: string): boolean {
        let charsFound = {} as { string : boolean };
        let n = str.length;

        for (let i = 0; i < n; i++) {
            let c = str[i];
            if (c in charsFound) return false;
            charsFound[c] = true;
        }

        return true;
    }

    /**
     * Naive solution assuming only ASCii characters.
     *
     * @param str
     * @returns {boolean}
     */
    public static checkUsingArray(str: string): boolean {
        let charsFound = Array(256).fill(0);
        let n = str.length;

        for (let i = 0; i < n; i++) {
            let charCode = str.charCodeAt(i);
            if (charsFound[charCode] > 0) return false;
            charsFound[charCode] = 1;
        }

        return true;
    }

    /**
     * For each character, check all the other characters to the right for uniqueness.
     *
     * Similar to a selection sort in complexity.
     *
     * @param str
     */
    public static checkByTraversingTwice(str: string) {
        let n = str.length;
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (str[i] === str[j]) {
                    return false;
                }
            }
        }
        return true;
    }
}
