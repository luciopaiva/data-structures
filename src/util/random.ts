
// Mersenne Twister implementation based on https://en.wikipedia.org/wiki/Mersenne_Twister

// Mersenne twister coefficients (for MT19937-32):
const w = 32;
const n = 624;
const m = 397;
const r = 31;
const a = 0x9908B0DF;
const u = 11;
const d = 0xFFFFFFFF;
const s = 7;
const b = 0x9D2C5680;
const t = 15;
const c = 0xEFC60000;
const l = 18;
const lower_mask = ((1 << r) - 1) >>> 0;
const upper_mask = ~lower_mask >>> 0;  // force 32 bits (w)
const f = 1812433253;

// console.info('0x' + lower_mask.toString(16).toUpperCase());
// console.info('0x' + upper_mask.toString(16).toUpperCase());

export class Random {

    private MT: number[];
    private index: number;

    constructor (seed: number = (new Date().getTime())) {
        // Initialize the generator from a seed
        this.MT = Array(n);
        this.index = n;
        this.MT[0] = seed >>> 0;
        for (let i = 1; i < n; i++) {
            this.MT[i] = (f * (this.MT[i-1] ^ (this.MT[i-1] >>> (w-2))) + i) >>> 0;
        }
    }

    /**
     * Extract a tempered value based on MT[index] calling twist() every n numbers.
     *
     * @returns {number} next 32-bit number in the sequence
     */
    public next32(): number {
        if (this.index >= n) {
            if (this.index > n) {
                throw new Error('Generator was never seeded!');
            }
            this.twist();
        }

        let y = this.MT[this.index];
        y = y ^ ((y >>> u) & d);
        y = y ^ ((y << s) & b);
        y = y ^ ((y << t) & c);
        y = y ^ (y >>> l);

        this.index++;
        return y >>> 0;
    }

    public next(): number {
        return this.next32() / 0x100000000;
    }

    /**
     * Generate the next n values from the series x_i.
     */
    private twist() {
        for (let i = 0; i < n; i++) {
            let x = (this.MT[i] & upper_mask) + (this.MT[(i+1) % n] & lower_mask);
            let xA = x >>> 1;

            if ((x % 2) != 0) { // lowest bit of x is 1
                xA ^= a;
            }
            this.MT[i] = this.MT[(i + m) % n] ^ xA;
        }
        this.index = 0;
    }
}
