/// <reference path="linq.d.ts" />
/// <reference path="biocad_webcore.d.ts" />
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
declare const containerClassName: string;
declare namespace Application.Explorer {
    /**
     * 文件浏览器的模型，这个对象是一个文件的集合
    */
    interface Explorer {
        /**
         * 文件列表
        */
        files: FileHandle[];
        /**
         * 用于显示文件列表的div容器的编号
        */
        divId: string;
        /**
         * div容器对象
        */
        container: HTMLDivElement;
    }
    /**
     * 将文件显示在html用户界面之上
     *
     * @param divId 文件浏览器将会显示在这个div之中
     * @param icons 将文件的mime type转换为大分类的映射数组
    */
    function show(divId: string, files: bioCADFile[], icons: BioCAD.MIME.mimeType[]): Explorer;
}
declare namespace Application.Explorer {
    /**
     * 文件数据模型
    */
    class bioCADFile {
        /**
         * 在数据库之中的唯一编号
        */
        id: number;
        /**
         * 显示的文件名
        */
        fileName: string;
        /**
         * 文件大小，单位为``B``
        */
        size: number;
        /**
         * 文件的格式信息描述
        */
        mime: BioCAD.MIME.mimeType;
        constructor(data: object, types: Dictionary<BioCAD.MIME.mimeType>);
        toString(): string;
    }
}
declare namespace Application.Explorer {
    /**
     * 将文件呈现给用户的UI代码部分
    */
    class FileHandle {
        divId: string;
        /**
         * 目标文件的数据模型对象
        */
        file: bioCADFile;
        div: HTMLDivElement;
        /**
         * ``[svg, color]``
        */
        mimeIcon: string[];
        readonly fileId: string;
        constructor(file: bioCADFile, icon: string[]);
        static classNames: string[];
        private footer;
        private actionButtons;
        getNode(): HTMLElement;
    }
}
declare namespace Application.Explorer {
    type BioClass = BioCAD.MIME.bioClassType;
    module bioMimeTypes {
        /**
         * bio class type to font-awsome icon name
         *
         * ## 2018-08-15 typescript 的枚举类型目前还不可以使用select进行选择
         * 所以在这里使用if进行数据的获取
        */
        function classToFontAwsome(cls: BioClass): string[];
    }
}
declare namespace Application.Suggestion.render {
    /**
     * 将结果显示到网页上面
     *
     * @param div 带有#符号前缀的id查询表达式
    */
    function makeSuggestions(terms: term[], div: string, click: (term: term) => void, top?: number, caseInsensitive?: boolean, divClass?: any, addNew?: ((newTerm: string) => void)): (input: string) => void;
}
declare namespace Application.Suggestion {
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
declare namespace Application.Suggestion {
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
declare namespace bioCAD.WebApp.Platform {
    class FileManager extends Bootstrap {
        private explorer;
        private mimes;
        private version;
        readonly appName: string;
        protected init(): void;
        private loadFiles;
    }
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
