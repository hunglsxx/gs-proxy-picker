interface proxyadapter {
    getProxyList(): any;
}

interface optstype {
    APIEndpoint?: string;
    APIKey?: string;
    adapter?: string;
    listCount?: number;
    filePath?: string;
    mode?: string;
}

export { proxyadapter, optstype }