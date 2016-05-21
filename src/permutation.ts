
import {ArrayUtil} from "./util/array-util";

export class Permutation {

    public static DEBUG = false;
    public static arraysCreated = 0;
    public static iterations = 0;

    /**
     * This is an implementation of the Heap's algorithm to generate all permutations of a list of items. It iterates as
     * many times as the `simple()` implementation, but it does not need to generate any auxiliary arrays during the
     * process, as opposed to the latter.
     * 
     * @param permutation
     * @param n
     * @param result
     * @returns {[][]}
     */
    public static heaps(permutation: any[], n: number = permutation.length, result: any[][] = []): any[][] {
        Permutation.DEBUG && Permutation.iterations++;
        if (n === 1) {
            result.push(ArrayUtil.clone(permutation));
            Permutation.DEBUG && Permutation.arraysCreated++;
        } else {
            for (let i = 0; i < n - 1; i += 1) {
                Permutation.heaps(permutation, n - 1, result);
                if (n % 2 == 0) {
                    ArrayUtil.swap(permutation, i, n - 1);
                } else {
                    ArrayUtil.swap(permutation, 0, n - 1);
                }
            }
            Permutation.heaps(permutation, n - 1, result)
        }
        return result;
    }

    public static simple(itemsLeft: any[], prefix: any[] = [], permutationsSoFar: any[] = []): any[][] {
        Permutation.DEBUG && Permutation.iterations++;
        // for each item left
        itemsLeft.forEach((item, index) => {
            if (itemsLeft.length == 1) {
                // if we have a whole permutation, save it and stop
                prefix.push(item);
                permutationsSoFar.push(prefix);
            } else {
                let newPrefix;
                let newItemsLeft;

                if (index == itemsLeft.length - 1) {
                    // if this is the last sub-branch in this branch, reuse existing arrays instead of cloning them
                    newPrefix = prefix;
                    newItemsLeft = itemsLeft;
                } else {
                    // add that item to the prefix
                    newPrefix = ArrayUtil.clone(prefix);
                    Permutation.DEBUG && Permutation.arraysCreated++;

                    // and then subtract it from the items left
                    newItemsLeft = ArrayUtil.clone(itemsLeft);
                    Permutation.DEBUG && Permutation.arraysCreated++;
                }
                newPrefix.push(item);
                newItemsLeft.splice(index, 1);

                // if there are items left to be processed, do a recursion
                Permutation.simple(newItemsLeft, newPrefix, permutationsSoFar);
            }
        });

        return permutationsSoFar;
    }
}
