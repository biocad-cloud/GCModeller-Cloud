/// <reference path="../../../../build/linq.d.ts" />
/// <reference path="../../../../build/bioCAD.core.d.ts" />

namespace DisplayAdapters {

    /**
     * 不适合显示超大的fasta序列文件
    */
    export class Fasta extends IDisplay {

        public colors: Dictionary<string>;

        show(div: string, file: string): void {
            $.get(file, (stream: string) => {
                var seq = FastaSeq.ParseFile(stream);
                var html: string = From(seq)
                    .Select(this.renderOne)
                    .JoinBy("\n");

                html = `<style>
                            ${this.colorCSS()}
                        </style>
                        <div>
                            ${html}
                        </div>`

                $(div).html(html);
            });
        }

        /**
         * 将颜色配置数据转换为用于支持颜色高亮的CSS样式
        */
        private colorCSS(): string {
            return this.colors
                .Keys
                .Select(c => {
                    var color: string = this.colors.Item(c);
                    var css: string = `
                        .base_${c} {
                            background-color: "${color}";
                            color: "darkgrey";
                        }
                    `;

                    return css;
                }).JoinBy("\n");
        }

        /**
         * 将fasta数据模型对象转换为对每一个符号进行颜色高亮的html代码
        */
        private renderOne(fa: FastaSeq): string {
            var html: string = "> " + fa.headers.join("|");
            var oneChar: string = "";
            var continues: string = "";
            var seqHtml: string = "";

            Strings
                .ToCharArray(fa.sequence.toUpperCase())
                .forEach(c => {
                    if (oneChar != c) {
                        // 结束当前span
                        if (continues.length > 0) {
                            // 因为在下面的初始化代码之中并还没有将第一个字符加入
                            // 到continues的span起始之后
                            // 所以要在这里将第一个字符补齐
                            continues += `${oneChar}</span>`;
                            seqHtml += continues;
                        }

                        continues = `<span class="base_${c}">`;
                        oneChar = c;
                    } else {
                        continues += c;
                    }
                });

            return html + `<p>${seqHtml}</p>`;
        }

        public static NuclFasta(): Fasta {
            return <Fasta>{
                colors: new Dictionary<string>({
                    "A": "rgb(0,255,0)",
                    "T": "rgb(0,0,255)",
                    "G": "rgb(255,0,0)",
                    "C": "rgb(255,0,255)",
                    "N": "rgb(255,255,0)"
                })
            }
        }

        public static ProtColors(): Fasta {
            return <Fasta>{
                colors: new Dictionary<string>({
                    "A": "rgb()",
                    "T": "rgb()",
                    "G": "rgb()",
                    "C": "rgb()",
                    "N": "rgb()"
                })
            }
        }
    }
}