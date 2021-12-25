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
        readonly commonName: string;
        names: string[];
        constructor(id: string, names: string[] | string);
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
declare namespace BioCAD.MIME {
    enum bioClassType {
        /**
         * The unknown class type
        */
        unknown = 0,
        /**
         * General text file
        */
        text = 1,
        /**
         * Image file
        */
        image = 2,
        /**
         * The data table is a kind of numeric matrix for gene expression data, or something.
        */
        matrix = 3,
        /**
         * The biological sequence data type, like fasta sequence file.
        */
        bioSequence = 4,
        /**
         * biological model file for run simulator
        */
        model = 5
    }
}
declare namespace BioCAD.MIME {
    /**
     * 对文件格式信息的简要描述
    */
    class mimeType {
        /**
         * 这种文件格式在数据库之中的唯一编号
        */
        classID: number;
        /**
         * 对文件内容的摘要描述信息
        */
        contentType: string;
        /**
         * 详细的描述信息
        */
        description: string;
        /**
         * 更加通用的大分类描述标签
        */
        class: bioClassType;
        constructor(data: object);
        toString(): string;
    }
}
