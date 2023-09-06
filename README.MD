### INSTALL
```npm i gs-proxy-picker```

### EXAMPLE
```
import { ProxyPicker } from 'gs-proxy-picker';

/** Using webshare adapter */
const websharePicker = new ProxyPicker({
    adapter: 'webshare',
    APIEndpoint: 'https://proxy.webshare.io/api/v2/proxy/list/',
    listCount: 10,
    APIKey: 'xxx-your-api-token-xxx',
    cacheTTL: 10,
});

/** Using json file adapter */
let jsonPicker = new ProxyPicker({
    adapter: 'jsonfile',
    filePath: '/your/path/file.json',
    cacheTTL: 10,
});

(async () => {
    console.log(await websharePicker.getAll()); // Get all proxy
    console.log(await websharePicker.getOne()); // Get a random proxy

    console.log(await jsonPicker.getAll());
    console.log(await jsonPicker.getOne());
})();
```