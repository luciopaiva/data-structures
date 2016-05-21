
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
    public static generate(n: number, initialValue: number = 0, step: (number|StepFunction) = 1): number[] {
        let result = [];
        let val = initialValue;
        for (let i = 0; i < n; i++) {
            val += isStepFunction(step) ? step() : step;
            result.push(val);
        }
        return result;
    }
}
