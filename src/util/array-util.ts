
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
}
