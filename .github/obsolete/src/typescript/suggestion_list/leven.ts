/**
 * Measure the difference between two strings with the fastest JS implementation 
 * of the Levenshtein distance algorithm
 * 
 * > https://github.com/sindresorhus/leven/blob/master/index.js
*/
class leven {

    public static compute(a: string, b: string): number {
        if (a === b) {
            return 0;
        }

        var swap = a;

        // Swapping the strings if `a` is longer than `b` so we know which one is the
        // shortest & which one is the longest
        if (a.length > b.length) {
            a = b;
            b = swap;
        }

        var aLen = a.length;
        var bLen = b.length;

        // Performing suffix trimming:
        // We can linearly drop suffix common to both strings since they
        // don't increase distance at all
        // Note: `~-` is the bitwise way to perform a `- 1` operation
        while (aLen > 0 && (a.charCodeAt(~-aLen) === b.charCodeAt(~-bLen))) {
            aLen--;
            bLen--;
        }

        // Performing prefix trimming
        // We can linearly drop prefix common to both strings since they
        // don't increase distance at all
        var start = 0;

        while (start < aLen && (a.charCodeAt(start) === b.charCodeAt(start))) {
            start++;
        }

        aLen -= start;
        bLen -= start;

        if (aLen === 0) {
            return bLen;
        } else {
            return leven.levelInternal(a, b, aLen, bLen, start);
        }
    }

    private static levelInternal(
        a: string,
        b: string,
        aLen: number,
        bLen: number,
        start: number): number {

        var bCharCode: number;
        var ret: number;
        var tmp: number;
        var tmp2: number;
        var i: number = 0;
        var j: number = 0;
        var arr: number[] = [];
        var charCodeCache: number[] = [];

        while (i < aLen) {
            charCodeCache[i] = a.charCodeAt(start + i);
            arr[i] = ++i;
        }

        while (j < bLen) {
            bCharCode = b.charCodeAt(start + j);
            tmp = j++;
            ret = j;

            for (i = 0; i < aLen; i++) {
                tmp2 = bCharCode === charCodeCache[i] ? tmp : tmp + 1;
                tmp = arr[i];
                ret = arr[i] = tmp > ret ? tmp2 > ret ? ret + 1 : tmp2 : tmp2 > tmp ? tmp + 1 : tmp2;
            }
        }

        return ret;
    }
}

