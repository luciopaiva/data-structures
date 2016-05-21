
export class BinarySearch {

    public static DEBUG = false;

    public static rank(wantedValue: number, orderedList: number[]): number {
        let lo = 0;
        let hi = orderedList.length - 1;
        let mid = 0;
        let rounds = 0;

        if (BinarySearch.DEBUG) {
            console.info(`Looking for value ${wantedValue}.`);
            console.info(`The list: [${orderedList.join(', ')}]`);
        }

        while (lo <= hi) {
            rounds++;
            if (BinarySearch.DEBUG) {
                console.info(`\nRound ${rounds}:`);
                console.info(`\tlist[${lo}..${hi}] => [${orderedList.slice(lo, hi + 1).join(', ')}]`);
            }

            mid = lo + Math.floor((hi - lo) / 2);
            let currentValue = orderedList[mid];

            if (currentValue == wantedValue) {
                return mid;
            } else if (currentValue < wantedValue) {
                lo = mid + 1;
            } else if (currentValue > wantedValue) {
                hi = mid - 1;
            }
        }

        return -1;
    }
}
