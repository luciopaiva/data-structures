
const DEFAULT_NODE_CAPACITY = 16;

enum NodePosition {
    NE = 0,
    SE = 1,
    SW = 2,
    NW = 3
}

export class QuadTreePoint {
    constructor (public x: number, public y: number) {}
    public toString(): string {
        return `(${this.x},${this.y})`;
    }
}

export type QuadTreeBounds = [QuadTreePoint, QuadTreePoint];

export class QuadTree<T extends QuadTreePoint> {

    private nodeCapacity: number;
    private children: QuadTree<T>[];
    private elements: T[];
    private bounds: QuadTreeBounds;
    private count: number;

    constructor (bounds: QuadTreeBounds, nodeCapacity: number = DEFAULT_NODE_CAPACITY) {
        this.nodeCapacity = nodeCapacity;
        this.elements = Array();
        this.children = null;
        this.bounds = bounds;
        this.count = 0;
    }

    public elementCount(): number {
        return this.count;
    }

    public queryDepth(): number {
        return this._queryDepth(0);
    }

    private _queryDepth(depth: number): number {
        if (this.elements) {
            return depth;
        } else {
            depth++;
            return Math.max(
                this.children[NodePosition.NE]._queryDepth(depth),
                this.children[NodePosition.SW]._queryDepth(depth),
                this.children[NodePosition.SE]._queryDepth(depth),
                this.children[NodePosition.NW]._queryDepth(depth)
            )
        }
    }

    public insert(element: T): boolean {
        if (!this.containsPoint(element as QuadTreePoint)) return false;

        if (this.elements) {
            if (this.elements.length < this.nodeCapacity) {
                this.elements.push(element);
                this.count++;
                return true;
            } else {
                this.subdivide();
            }
        }

        if (this.children) {
            if (this.children[NodePosition.NE].insert(element)) { this.count++; return true; }
            if (this.children[NodePosition.SE].insert(element)) { this.count++; return true; }
            if (this.children[NodePosition.SW].insert(element)) { this.count++; return true; }
            if (this.children[NodePosition.NW].insert(element)) { this.count++; return true; }
        }

        return false;
    }

    public queryBox(box?: QuadTreeBounds): T[] {
        if (box && !this.intersects(box)) return [];

        if (this.elements) {
            if (box) {
                return this.elements.filter(element => {
                    return (
                        element.x >= box[0].x &&
                        element.y >= box[0].y &&
                        element.x <= box[1].x &&
                        element.y <= box[1].y
                    );
                });
            } else {
                return Array.from(this.elements);  // return a copy of the array
            }
        } else {
            let result = [] as T[];
            this.children[NodePosition.NE].queryBox(box).forEach(elem => result.push(elem));
            this.children[NodePosition.SE].queryBox(box).forEach(elem => result.push(elem));
            this.children[NodePosition.SW].queryBox(box).forEach(elem => result.push(elem));
            this.children[NodePosition.NW].queryBox(box).forEach(elem => result.push(elem));
            return result;
        }
    }

    private intersects(box: QuadTreeBounds): boolean {
        let me = this.bounds;
        // let meStr = `[[${me[0].x},${me[0].y}],[${me[1].x},${me[1].y}]]`;
        // let boxStr = `[[${box[0].x},${box[0].y}],[${box[1].x},${box[1].y}]]`;
        // console.info(meStr + ' intersects ' + boxStr);
        if (me[0].x > box[1].x) return false;
        if (me[0].y > box[1].y) return false;
        if (me[1].x < box[0].x) return false;
        if (me[1].y < box[0].y) return false;
        return true;
    }

    private containsPoint(point: QuadTreePoint): boolean {
        return (
            this.bounds[0].x <= point.x &&
            this.bounds[0].y <= point.y &&
            this.bounds[1].x >= point.x &&
            this.bounds[1].y >= point.y
        );
    }

    private subdivide() {
        let bounds;
        let left = this.bounds[0].x;
        let top = this.bounds[0].y;
        let right = this.bounds[1].x;
        let bottom = this.bounds[1].y;
        let width = right - left;
        let height = bottom - top;

        // create children
        this.children = Array(4);

        bounds = [new QuadTreePoint(left + width / 2, top), new QuadTreePoint(right, top + height / 2)];
        this.children[NodePosition.NE] = new QuadTree<T>(bounds, this.nodeCapacity);

        bounds = [new QuadTreePoint(left + width / 2, top + height / 2), new QuadTreePoint(right, bottom)];
        this.children[NodePosition.SE] = new QuadTree<T>(bounds, this.nodeCapacity);

        bounds = [new QuadTreePoint(left, top + height / 2), new QuadTreePoint(left + width / 2, bottom)];
        this.children[NodePosition.SW] = new QuadTree<T>(bounds, this.nodeCapacity);

        bounds = [new QuadTreePoint(left, top), new QuadTreePoint(left + width / 2, top + height / 2)];
        this.children[NodePosition.NW] = new QuadTree<T>(bounds, this.nodeCapacity);

        // move elements
        this.elements.forEach(element => {
            this.children[NodePosition.NE].insert(element);
            this.children[NodePosition.SE].insert(element);
            this.children[NodePosition.SW].insert(element);
            this.children[NodePosition.NW].insert(element);
        });

        // erase elements locally
        this.elements = null;
    }

    public dumpStructure(level: string = ''): string {
        if (this.elements) {
            return '#' + this.elementCount() + '\n';
        } else {
            let ne = this.children[NodePosition.NE].dumpStructure(level + '  ');
            ne = ne[0] == '#' ? ne : '\n' + ne;
            let se = this.children[NodePosition.SE].dumpStructure(level + '  ');
            se = se[0] == '#' ? se : '\n' + se;
            let sw = this.children[NodePosition.SW].dumpStructure(level + '  ');
            sw = sw[0] == '#' ? sw : '\n' + sw;
            let nw = this.children[NodePosition.NW].dumpStructure(level + '  ');
            nw = nw[0] == '#' ? nw : '\n' + nw;
            return (
                level + 'NE: ' + ne +
                level + 'SE: ' + se +
                level + 'SW: ' + sw +
                level + 'NW: ' + nw
            );
        }
    }
}
