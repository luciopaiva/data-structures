"use strict";
var BinarySearch = (function () {
    function BinarySearch() {
    }
    BinarySearch.rank = function (wantedValue, orderedList) {
        var lo = 0;
        var hi = orderedList.length - 1;
        var result = {
            index: 0,
            rounds: 0
        };
        while (lo <= hi) {
            result.rounds++;
            result.index = lo + Math.floor((hi - lo) / 2);
            var currentValue = orderedList[result.index];
            if (currentValue == wantedValue) {
                return result;
            }
            else if (currentValue < wantedValue) {
                lo = result.index + 1;
            }
            else if (currentValue > wantedValue) {
                hi = result.index - 1;
            }
        }
        result.index = -1;
        return result;
    };
    BinarySearch.main = function () {
        var N = 20;
        var MAX_STEP = 10;
        var list = [];
        var curVal = 1 + Math.floor(Math.random() * MAX_STEP);
        list.push(curVal);
        for (var i = 0; i < N - 1; i++) {
            curVal += 1 + Math.floor(Math.random() * MAX_STEP);
            list.push(curVal);
        }
        console.info(list.join(', '));
        var selectedIndex = Math.floor(Math.random() * N);
        var result = BinarySearch.rank(list[selectedIndex], list);
        console.info(("The value " + list[selectedIndex] + " is at position " + result.index + " and it took " + result.rounds + " ") +
            "rounds to find it.");
    };
    return BinarySearch;
}());
exports.BinarySearch = BinarySearch;
