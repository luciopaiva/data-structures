
/**
 * Remove duplicate characters from a given string.
 * Should not create an extra array during the operation.
 */
export class RemoveDuplicates {

    public static simple(str: string): string {
        // This does not count as an "extra array", as we're just converting the input string into an array instead of
        // asking for the caller to transform it into an array herself
        let result = Array.from(str);

        for (let i = 0; i < result.length; i++) {
            for (let j = i + 1; j < result.length; j++) {
                if (result[j] === result[i]) {
                    result.splice(j, 1);  // delete in place, avoiding the creation of the extra array
                }
            }
        }

        return result.join('');
    }
}
