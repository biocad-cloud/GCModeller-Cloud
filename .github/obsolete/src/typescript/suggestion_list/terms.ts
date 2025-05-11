const NA: number = 100000000000;

/**
 * Term for suggestion
*/
class term {

    /**
     * 这个term在数据库之中的id编号
    */
    public id: number;
    public term: string;

    constructor(id: number, term: string) {
        this.id = id;
        this.term = term;
    }

    /**
     * 使用动态规划算法计算出当前的这个term和用户输入之间的相似度
    */
    public dist(input: string): number {
        // return leven.compute(this.term, input);
        return term.indexOf(this.term, input);
    }

    public static indexOf(term: string, input: string): number {
        var i = term.indexOf(input);

        if (i == -1) {
            return NA;
        } else {
            return Math.abs(input.length - term.length);
        }
    }
}

class scoreTerm {

    public score: number;
    public term: term;

    constructor(term: term, score: number) {
        this.term = term;
        this.score = score;
    }
}
