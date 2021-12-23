/// <reference path="linq.d.ts" />
/// <reference path="Metabolic_pathway.d.ts" />
declare namespace bioCAD.WebApp {
    /**
     * script module for user login
    */
    class LoginScript extends Bootstrap {
        readonly appName: string;
        protected init(): void;
        login_click(): void;
        static do_login(): void;
    }
}
declare namespace bioCAD.WebApp {
    class RecoverScript extends Bootstrap {
        readonly appName: string;
        protected init(): void;
        static doRecover_onclick(): void;
    }
}
declare namespace bioCAD.WebApp {
    class RegisterScript extends Bootstrap {
        readonly appName: string;
        protected init(): void;
        doRegister_onclick(): void;
    }
}
declare const dev: Console;
declare const logo: string[];
declare namespace bioCAD.WebApp {
    function start(): void;
}
declare namespace bioCAD.WebApp.Platform {
    type nodeIndex = {
        pathway: string;
        keys: string[];
    };
    type lineData = {
        name: string;
        type: 'line';
        smooth: true;
        showSymbol: false;
        clip: true;
        data: number[][];
        emphasis: {
            focus: 'series';
        };
        ymax: number;
    };
    const listDiv = "#sample_suggests";
    const inputDiv = "#sample_search";
    class Report extends Bootstrap {
        readonly pathways: Dictionary<nodeIndex>;
        readonly data: {
            y: IEnumerator<lineData>;
        };
        readonly appName: string;
        private updateChart;
        static parseData(data: csv.dataframe): IEnumerator<lineData>;
        private myChart;
        private csvText;
        private makeChart;
        private makeChartInternal;
        protected init(): void;
        getPLAS_onclick(): void;
        private initPathwaySelector;
        private clickOnTerm;
    }
}
declare namespace bioCAD.WebApp.Platform {
    class TaskMgr extends Bootstrap {
        private totalTasks;
        readonly appName: string;
        protected init(): void;
        private loadTable;
        private getModelId;
        private taskRow;
    }
    interface task {
        /**
         * the app name
        */
        name: string;
        /**
         * the task title
        */
        title: string;
        create_time: string;
        status: number;
        finish_time: string;
        sha1: string;
        app_view: string;
    }
}
declare namespace uikit.suggestion_list.render {
    /**
     * 将结果显示到网页上面
     *
     * @param div 带有#符号前缀的id查询表达式
    */
    function makeSuggestions(terms: term[], div: string, click: (term: term) => void, top?: number, caseInsensitive?: boolean, divClass?: any, addNew?: ((newTerm: string) => void)): (input: string) => void;
}
declare namespace uikit.suggestion_list {
    class suggestion {
        private terms;
        constructor(terms: term[]);
        hasEquals(input: string, caseInsensitive?: boolean): boolean;
        /**
         * 返回最相似的前5个结果
        */
        populateSuggestion(input: string, top?: number, caseInsensitive?: boolean): term[];
        private static makeAdditionalSuggestion;
        private static getScore;
    }
}
declare namespace uikit.suggestion_list {
    const NA: number;
    /**
     * Term for suggestion
    */
    class term {
        id: string;
        term: string;
        /**
         * @param id 这个term在数据库之中的id编号
        */
        constructor(id: string, term: string);
        /**
         * 使用动态规划算法计算出当前的这个term和用户输入之间的相似度
        */
        dist(input: string): number;
        static indexOf(term: string, input: string): number;
    }
    interface scoreTerm {
        score: number;
        term: term;
    }
}
