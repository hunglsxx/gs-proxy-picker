import { optstype, proxyadapter } from "../_base";
const fetch = require('node-fetch');

export class webshare implements proxyadapter {

    public APIEndpoint: string;
    public listCount: number;
    public APIKey: string;

    constructor(options: optstype) {
        this.APIEndpoint = options.APIEndpoint || '';
        this.listCount = options.listCount || 10;
        this.APIKey = options.APIKey || ''
    }

    public async getProxyList() {
        let data: any = [];
        if (this.APIEndpoint == '' || this.APIKey == '') return data;

        const url = new URL(this.APIEndpoint);
        url.searchParams.append('mode', 'direct');
        url.searchParams.append('page_size', `${this.listCount}`);
        url.searchParams.append('valid', 'true');

        const req = await fetch(url.href, {
            method: "GET",
            headers: {
                Authorization: this.APIKey
            }
        });

        const res: any = await req.json();
        if (res.results && res.results.length) {
            data = res.results.map(function (row: any) {
                return `http://${row.username}:${row.password}@${row.proxy_address}:${row.port}`;
            });
        }
        return data;
    }
}