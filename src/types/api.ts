import { AxiosResponse } from 'axios';
import { KeyedMutator } from 'swr';
import { CrossFile } from '.';

export type Response<T = any> = {
    data: T | null;
    errors: string[] | null;
};

export type SWRResponse<T extends Response> = AxiosResponse<T>;

export type SWRHook<T extends Response> = [T['data'] | undefined | null, boolean, KeyedMutator<SWRResponse<T>>];

export type LoginResponse = Response<string>;

export type Product = {
    id: number;
    name: string;
};

export type ProductsResponse = Response<Product[]>;
export type ProductResponse = Response<Product>;
