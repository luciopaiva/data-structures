
import {NumberArray} from "./util/number-array";

/**
 * The classic FizzBuzz problem
 * https://blog.codinghorror.com/why-cant-programmers-program/
 */
export class FizzBuzz {
    
    public static run(n: number): string[] {
        let result = [];

        for (let i of NumberArray.generate(n)) {
            if ((i % 3 == 0) && (i % 5 == 0)) {
                result.push('FizzBuzz');
            } else if (i % 3 == 0) {
                result.push('Fizz');
            } else if (i % 5 == 0) {
                result.push('Buzz');
            } else {
                result.push(i.toString());
            }
        }

        return result;
    }
}
