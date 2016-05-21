
export function shuffle(list: number[]) {
    let N = list.length;
    for (let i = 0; i < N; i++) {
        let otherIndex = Math.floor(Math.random() * N);
        let otherItem = list[otherIndex];
        list[otherIndex] = list[i];
        list[i] = otherItem;
    }
}
