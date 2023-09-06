import { optstype, proxyadapter } from "../_base";
const fs = require('fs');

export class jsonfile implements proxyadapter {

    public filePath: string;

    constructor(options: optstype) {
        this.filePath = options.filePath || '';
    }

    public async getProxyList() {
        if (this.filePath == '' || !fs.existsSync(this.filePath)) return [];
        try {
            let jsondata = JSON.parse(fs.readFileSync(this.filePath));
            let data = jsondata.map(function(js:any) {
                return js.value;
            });
            return data;
        } catch (error) {
            return [];
        }
    }
}