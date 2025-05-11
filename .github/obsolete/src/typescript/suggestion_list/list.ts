/// <reference path="../../build/linq.d.ts" />

class suggestion {

    private terms: term[];

    constructor(terms: term[]) {
        this.terms = terms;
    }

    /**
     * 返回最相似的前5个结果
    */
    public populateSuggestion(input: string,
        top: number = 5,
        caseInsensitive: boolean = false): term[] {

        var lowerInput: string = input.toLowerCase();
        var scores: IEnumerator<scoreTerm> = From(this.terms)
            .Select(q => {
                var score: number = suggestion.getScore(
                    q, input,
                    lowerInput,
                    caseInsensitive
                );
                return new scoreTerm(q, score);
            })
            .OrderBy(rank => rank.score);
        var result: term[] = scores
            .Where(s => s.score != NA)
            .Take(top)
            .Select(s => s.term)
            .ToArray();

        if (result.length == top) {
            return result;
        } else {
            // 非NA得分的少于top的数量
            // 需要换一种方式计算结果，然后进行补充
            var addi: term[] = scores
                .Skip(result.length)
                .Select(s => {
                    var q: term = s.term;
                    var score: number;

                    if (caseInsensitive) {
                        score = leven.compute(
                            q.term.toLowerCase(),
                            lowerInput
                        );
                    } else {
                        score = leven.compute(q.term, input);
                    }

                    return new scoreTerm(q, score);
                }).OrderBy(s => s.score)
                .Take(top - result.length)
                .Select(s => s.term)
                .ToArray();

            result = [...result, ...addi];
        }

        return result;
    }

    private static getScore(q: term,
        input: string,
        lowerInput: string,
        caseInsensitive: boolean): number {

        if (caseInsensitive) {
            // 大小写不敏感的模式下，都转换为小写
            var lowerTerm: string = q.term.toLowerCase();

            return term.indexOf(
                lowerTerm,
                lowerInput
            );

        } else {
            return q.dist(input);
        }
    }
}