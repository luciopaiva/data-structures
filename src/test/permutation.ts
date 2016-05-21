
import assert = require("assert");
import {Permutation} from "../permutation";

describe('Permutations', function () {

    function checkAlgorithm(alg: (list: any[]) => any[][]) {
        let result = alg('abc'.split('')).sort((s1, s2) => s1 < s2 ? -1 : 1);
        let answer = [
            [ 'a', 'b', 'c' ],
            [ 'a', 'c', 'b' ],
            [ 'b', 'a', 'c' ],
            [ 'b', 'c', 'a' ],
            [ 'c', 'a', 'b' ],
            [ 'c', 'b', 'a' ]
        ];

        assert.equal(result.length, answer.length, `Found ${result.length} permutations, expected ${answer.length}.`);

        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result[0].length; j++) {
                assert.equal(result[i][j], answer[i][j], `Permutations don't match: [${result[i]}], [${answer[i]}].`)
            }
        }
    }
    
    it("Heap's algorithm should generate all permutations", function () {
        checkAlgorithm(Permutation.heaps);
    });
    
    it("Simple permutation algorithm should generate all permutations", function () {
        checkAlgorithm(Permutation.simple);
    });
});
