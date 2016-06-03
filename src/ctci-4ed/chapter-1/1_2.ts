
/**
 * Reverse a given string.
 */
export class ReverseString {

    public static reverse(str: string): string {
        let result = '';
        for (let i = str.length - 1; i >= 0; i--) {
            result = str[i];
        }
        return result;
    }
}
