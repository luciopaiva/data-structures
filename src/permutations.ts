
import {ArrayUtil} from "./util/array-util";

let arraysCreated = 0;

export function permutations(itemsLeft: any[], prefix: any[] = [], permutationsSoFar: any[] = []): any[][] {
    // for each item left
    itemsLeft.forEach((item, index) => {
        if (itemsLeft.length == 1) {
            // if we have a whole permutation, save it and stop
            prefix.push(item);
            permutationsSoFar.push(prefix);
        } else {
            // add that item to the prefix
            let newPrefix = ArrayUtil.clone(prefix);
            arraysCreated++;
            newPrefix.push(item);

            // and then subtract it from the items left
            let newItemsLeft = ArrayUtil.clone(itemsLeft);
            arraysCreated++;
            newItemsLeft.splice(index, 1);

            // if there are items left to be processed, do a recursion
            permutations(newItemsLeft, newPrefix, permutationsSoFar);
        }
    });
    return permutationsSoFar;
}

let result = permutations('abc'.split(''));
result.forEach(perm => console.info(perm));
console.info('Total permutations: ' + result.length);
console.info('Arrays created: ' + arraysCreated);