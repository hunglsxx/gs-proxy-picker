import { Cache } from 'file-system-cache';
import { Adapter } from './adapter';
import { optstype } from './adapters/_base';
import * as path from 'path';

export class ProxyPicker {

    public APIEndpoint: string;
    public APIKey: string;
    public listCount: number;
    public cache: Cache;
    public cacheTTL: number;
    public adapter: string;
    public filePath: string;

    public options: optstype;

    constructor(options: any) {

        this.APIEndpoint = options.APIEndpoint || '';
        this.APIKey = options.APIKey || '';
        this.adapter = options.adapter || 'webshare';
        this.listCount = options.listCount || 10;
        this.cacheTTL = options.cacheTTL || 60;
        this.filePath = options.filePath || '';

        this.cache = new Cache({
            basePath: `${path.resolve(__dirname, '.proxies')}`,
            ns: `${this.adapter}`,
            hash: "sha1",
            ttl: this.cacheTTL
        });

        this.options = {
            APIEndpoint: this.APIEndpoint,
            APIKey: this.APIKey,
            adapter: this.adapter,
            listCount: this.listCount,
            filePath: this.filePath
        };
    }

    private async getAllByAPI() {
        let cacheLoad = await this.cache.load();
        let hit = true;
        let data: any = [];
        if (!cacheLoad.files.length) hit = false;
        for (let k in cacheLoad.files) {
            if (!cacheLoad.files[k].value) {
                hit = false;
                break;
            }
            data.push(cacheLoad.files[k].value);
        }

        if (hit) return data;

        const adapter = new Adapter(this.options);
        data = await adapter.getProxyList();

        if (data.length) {
            let cachesList: any = [];
            for (let k in data) {
                cachesList.push({
                    key: `${k}`,
                    value: data[k]
                });
            }
            await this.cache.save(cachesList);
        }

        return data;
    }

    public async getOne() {
        let key = Math.floor(Math.random() * (this.listCount - 1));
        const value = await this.cache.get(`${key}`);
        if (value) return value;

        let alls = await this.getAllByAPI();
        if (alls.length) return alls[0];

        return null;
    }

    public async getAll() {
        return await this.getAllByAPI();
    }
}