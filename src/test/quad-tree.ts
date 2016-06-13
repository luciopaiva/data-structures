
import assert = require("assert");
import {QuadTreePoint, QuadTree, QuadTreeBounds} from "../quad-tree";
import {Random} from "../util/random";

describe('Quad-tree', function () {
    let WIDTH = 1000;
    let HEIGHT = 1000;
    let capacity = 10;
    let quadTree = new QuadTree([new QuadTreePoint(0,0), new QuadTreePoint(WIDTH,HEIGHT)], capacity);

    it("should be able to insert elements into the quad-tree", function () {
        let numElements = 10;
        let rand = new Random(42);

        //  insert 10 elements
        for (let i = 0; i < numElements; i++) {
            quadTree.insert(new QuadTreePoint(rand.next32() % WIDTH, rand.next32() % HEIGHT));
        }
        assert.strictEqual(quadTree.elementCount(), numElements);
        assert.strictEqual(quadTree.queryDepth(), 0);

        // insert more 10 elements
        for (let i = 0; i < numElements; i++) {
            quadTree.insert(new QuadTreePoint(rand.next32() % WIDTH, rand.next32() % HEIGHT));
        }
        assert.strictEqual(quadTree.elementCount(), 2 * numElements);
        assert(quadTree.queryDepth() > 0);
    });

    it("should be able to find elements given some query box", function () {
        let result;
        result = quadTree.queryBox();
        assert.strictEqual(result.length, 20);

        quadTree = new QuadTree([new QuadTreePoint(0,0), new QuadTreePoint(WIDTH,HEIGHT)], capacity);

        // saturate a node
        quadTree.insert(new QuadTreePoint(1,1));
        quadTree.insert(new QuadTreePoint(WIDTH - 1, HEIGHT - 1));

        result = quadTree.queryBox([new QuadTreePoint(WIDTH - 2, HEIGHT - 2), new QuadTreePoint(WIDTH, HEIGHT)]);
        assert.strictEqual(result.length, 1);
    });

    // FIXME this test should work
    // it("should handle more elements at the same position than the capacity", function () {
    //     quadTree = new QuadTree([new QuadTreePoint(0,0), new QuadTreePoint(WIDTH,HEIGHT)], 1);
    //     quadTree.insert(new QuadTreePoint(1,1));
    //     quadTree.insert(new QuadTreePoint(1,1));
    //     // it should've crashed by now, trying to recursively
    // });

    // TODO implement me
    // it("should be able to remove an element from the quad-tree", function () {
    //
    // });
});
