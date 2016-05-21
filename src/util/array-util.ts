
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
}
