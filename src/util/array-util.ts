
export class ArrayUtil {

    /**
     * Swaps two given items of an array.
     *
     * @param list the array containing the items to be swapped
     * @param i1 index of the first item of the pair to be swapped
     * @param i2 index of the other item of the pair to be swapped
     */
    public static swap(list: any[], i1: number, i2: number) {
        let temp = list[i1];
        list[i1] = list[i2];
        list[i2] = temp;
    }

    /**
     * @param list1
     * @param list2
     * @returns {boolean} true if arrays are equal in size and content; false, otherwise
     */
    public static compare(list1: any[], list2: any[]): boolean {
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
    public static clone(list: any[]): any[] {
        if (list == null) return null;
        return list.slice(0);
    }

    /**
     * Zip two arrays together in a third new array. The length of the resulting array is the length of the biggest
     * input array, in case they have different sizes. If that is the case, the remaining missing entries of the smaller
     * array will be padded with the `null` value.
     *
     * @param l1 first array
     * @param l2 second array
     * @returns {Array} resulting, zipped array containing both input arrays
     */
    public static zip(l1: any[], l2: any[]): any[] {
        let base, other;
        let result = [];

        if (l1.length >= l2.length) {
            base = l1;
            other = l2;
        } else {
            base = l2;
            other = l1;
        }

        let n = base.length;
        let otherLength = other.length;
        for (let i = 0; i < n; i++) {
            let otherValue = (i >= otherLength) ? null : other[i];
            result.push([base[i], otherValue]);
        }

        return result;
    }
}
