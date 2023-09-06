interface proxyadapter {
    getProxyList(): any;
}

interface optstype {
    APIEndpoint?: string;
    APIKey?: string;
    adapter?: string;
    listCount?: number;
    filePath?: string
}

export { proxyadapter, optstype }