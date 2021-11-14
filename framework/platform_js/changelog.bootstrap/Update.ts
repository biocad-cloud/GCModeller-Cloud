/// <reference path="../../../build/linq.d.ts" />

class Update {

    /**
     * The github commit hash of this update
    */
    public commit_hash: string;
    public date: Date;
    public updates: updateLog[];

    public get HTML(): string {
        return `
            <p>
                <strong>UPDATE: ${this.date.toLocaleDateString()}</strong> 
                        [<a href="https://github.com/GCModeller-Cloud/bioCAD/tree/${this.commit_hash}">${this.commit_hash}</a>]
            </p>
            <p>
                ${From(this.updates).Select(i => i.bootstrapItem).JoinBy("<br />\n")}
            </p>`;
    }
}

