
import {ArrayUtil} from "./array-util";

export class NumberArray extends ArrayUtil {

    /**
     * Generate a list of numbers starting in `initialValue`, stepping `step` between numbers and generating a total of
     * `n` entries.
     *
     * @param n how many numbers
     * @param initialValue the initial value
     * @param step step between each pair of numbers in the sequence
     * @returns {Array} the generated list of numbers
     */
    public static generate(n: number, initialValue: number = 0, step: number = 1): number[] {
        let result = [];
        for (let i = initialValue; i < n; i += step) {
            result.push(i);
        }
        return result;
    }

    /**
     * @param list1
     * @param list2
     * @returns {boolean} true if arrays are equal in size and content; false, otherwise
     */
    public static compare(list1: number[], list2: number[]): boolean {
        if (list1 == null || list2 == null || list1.length != list2.length) {
            return false;
        }

        return list1.every((item, index) => list2[index] === item);
    }

    /**
     * Clones a list of numbers.
     *
     * @param list the original list to be cloned
     * @returns {number[]} the new copy
     */
    public static clone(list: number[]): number[] {
        if (list == null) return null;
        let result = [];
        list.forEach(item => result.push(item));
        return result;
    }
}
