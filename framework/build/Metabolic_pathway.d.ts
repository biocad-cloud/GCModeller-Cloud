/// <reference path="linq.d.ts" />
/// <reference path="../layer.d.ts" />
/// <reference path="biocad_webcore.d.ts" />
declare namespace biodeep.app {
    function start(): void;
}
declare namespace apps {
    class Cola_graph {
        node: any;
        link: any;
        group: any;
        label: any;
        private vm;
        constructor(node: any, link: any, group: any, label: any, vm: Metabolic_pathway);
        tick(): Delegate.Action;
        private transform;
    }
}
declare namespace apps {
    class Metabolic_pathway extends Bootstrap {
        readonly appName: string;
        private width;
        private height;
        margin: number;
        pad: number;
        private d3cola;
        private outer;
        private vis;
        constructor();
        private redraw;
        savePng(): void;
        protected init(): void;
        /**
         * load network graph model and then
         * initialize data visualization
         * components.
        */
        private loadGraph;
        private static insertLinebreaks;
    }
}
declare namespace apps {
    class PathwayExplorer extends Bootstrap {
        readonly appName: string;
        readonly assemblyKey: string;
        protected init(): void;
        private loadUITree;
        private saveCache;
        private loadCache;
    }
}
declare namespace PathwayNavigator {
    function parseJsTree(kegg_tree: KEGG.brite.IKEGGBrite): jsTree;
}
declare namespace PathwayNavigator {
    /**
     * Expected format of the node (there are no required fields)
    */
    interface jsTree {
        /**
         * the unique id of a tree node, will be autogenerated if omitted
        */
        id: string;
        /**
         * node text
        */
        text: string;
        /**
         * string for custom
        */
        icon?: string;
        state?: {
            /**
             * is the node open
            */
            opened: boolean;
            /**
             * is the node disabled
            */
            disabled: boolean;
            /**
             * is the node selected
            */
            selected: boolean;
        };
        /**
         * array of strings or objects
        */
        children?: jsTree[];
        /**
         * attributes for the generated LI node
        */
        li_attr?: {};
        /**
         * attributes for the generated A node
        */
        a_attr?: {};
    }
}
interface graph {
    nodes: node[];
    links?: link[];
    constraints?: constraint[];
    groups?: group[];
}
interface node {
    label: string;
    dunnartid: string;
    index: number;
    width: number;
    height: number;
    x: number;
    y: number;
    rx: number;
    ry: number;
}
interface link {
    source: number;
    target: number;
}
interface constraint {
    axis: "x" | "y";
    offsets: {
        node: number;
        offset: number;
    }[];
    type: string;
}
interface group {
    leaves: number[];
    padding: number;
    style: string;
}
declare namespace dataAdapter {
    class parseDunnart {
        private nodeLookup;
        private graph;
        private sbsvg;
        constructor(svgObjId?: string);
        getGraph(): graph;
        private loadNodes;
    }
}