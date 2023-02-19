export type User = {
    token: string;
};

export type CrossFile = {
    isLocal: boolean;
    name: string;
    url: string;
    file?: File;
};
