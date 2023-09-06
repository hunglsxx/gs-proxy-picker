import * as ADP from './adapters';
import { optstype, proxyadapter } from './adapters/_base';

export class Adapter {
    public adapter: proxyadapter;

    constructor(options: optstype) {
        this.adapter = (options.adapter)
            ? eval(`new ADP.${options.adapter}(${JSON.stringify(options)})`)
            : new ADP.webshare(options);
    }

    public async getProxyList() {
        return await this.adapter.getProxyList();
    }
}