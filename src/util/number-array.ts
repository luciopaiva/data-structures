
import {ArrayUtil} from "./array-util";

interface StepFunction { (): number }

function isStepFunction(step: any): step is StepFunction {
    return typeof step == 'function';
}

export class NumberArray extends ArrayUtil {

    /**
     * Generate a list of numbers starting in `initialValue`, stepping `step` between numbers and generating a total of
     * `n` entries.
     *
     * `step` may be a function as well. This is suitable if your step must follow some non-linear progression.
     *
     * @param n how many numbers
     * @param initialValue the initial value
     * @param step the gap between each pair of numbers in the sequence, or a function that returns the gap
     * @returns {Array} the generated list of numbers
     */
    public static *generate(n: number, initialValue: number = 0,
                            step: (number|StepFunction) = 1): IterableIterator<number> {
        let val = initialValue;
        for (let i = 0; i < n; i++) {
            yield val;
            val += isStepFunction(step) ? step() : step;
        }
    }

    /**
     * Check if a given list of numbers is sorted.
     *
     * Obs.: it allows duplicates in the list.
     *
     * @param list the list to be checked
     * @param ascending whether the list should be in ascending or descending order
     * @returns true if the list is sorted, false otherwise
     */
    public static isSorted(list: number[], ascending: boolean = true): boolean {
        let N = list.length;
        for (let i = 1; i < N; i++) {
            if (ascending ? list[i] < list[i-1] : list[i] > list[i-1]) {
                return false;
            }
        }
        return true;
    }
}
