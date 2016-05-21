
export class BinarySearch {

    public static rank(wantedValue: number, orderedList: number[]): { index: number, rounds: number } {
        let lo = 0;
        let hi = orderedList.length - 1;
        let result = {
            index: 0,
            rounds: 0
        };

        while (lo <= hi) {
            result.rounds++;
            result.index = lo + Math.floor((hi - lo) / 2);
            let currentValue = orderedList[result.index];
            if (currentValue == wantedValue) {
                return result;
            } else if (currentValue < wantedValue) {
                lo = result.index + 1;
            } else if (currentValue > wantedValue) {
                hi = result.index - 1;
            }
        }

        result.index = -1;
        return result;
    }

    public static main() {
        let N = 20;
        let MAX_STEP = 10;
        let list = [];

        let curVal = 1 + Math.floor(Math.random() * MAX_STEP);
        list.push(curVal);
        for (let i = 0; i < N - 1; i++) {
            curVal += 1 + Math.floor(Math.random() * MAX_STEP);
            list.push(curVal);
        }

        console.info(list.join(', '));
        let selectedIndex = Math.floor(Math.random() * N);
        let result = BinarySearch.rank(list[selectedIndex], list);
        console.info(`The value ${list[selectedIndex]} is at position ${result.index} and it took ${result.rounds} ` +
            `rounds to find it.`);
    }
}
