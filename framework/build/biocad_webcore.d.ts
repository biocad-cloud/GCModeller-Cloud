/// <reference path="linq.d.ts" />
declare module Utils {
    /**
     * Create a callback function handler for refresh the image
     *
     * @param api URL for image source.
     * @param imgID id attribute of the img tag
    */
    function RefreshImage(api: string, imgID: string): () => void;
    /**
     * Alias of the function: ``Math.random``
    */
    function rnd(): number;
}
/**
 * The kegg brite index file parser
 *
 * https://www.kegg.jp/kegg/brite.html
*/
declare namespace KEGG.brite {
    /**
     * 将目标brite json文件或者对象解析为对象entry枚举
    */
    function parse(briteText: string | IKEGGBrite): IEnumerator<IBriteEntry>;
    function parseIDEntry(text: string): IDEntry;
}
declare namespace KEGG.brite {
    /**
     * The raw json tree of the kegg brite data
    */
    interface IKEGGBrite {
        name: string;
        children: IKEGGBrite[];
    }
    /**
     * key-value mapping of [ID => names]
    */
    class IDEntry {
        id: string;
        names: string[];
        readonly commonName: string;
        constructor(id: string, names: string[]);
        toString(): string;
    }
    interface IBriteEntry {
        entry: IDEntry;
        class_path: string[];
    }
}
declare namespace MIME {
    /**
     * The fasta sequence parser and data model
    */
    interface FastaSeq {
        headers: string[];
        sequence: string;
    }
    function ParseFasta(stream: string): FastaSeq[];
}
