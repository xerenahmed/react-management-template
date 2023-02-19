import axios, { AxiosRequestConfig } from 'axios';
import { LoginResponse, ProductResponse, ProductsResponse, Response, SWRHook, SWRResponse } from '../types/api';
import { API_URL } from '../utils/constants';
import useSWR, { SWRConfiguration } from 'swr';

const axiosClient = axios.create({
    baseURL: API_URL,
    validateStatus: () => true,
});

const withAuth = (token: string, config: AxiosRequestConfig = {}): AxiosRequestConfig => ({
    ...config,
    headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
    },
});

const swrFetcher = ([url, params]: [string, object]) => axiosClient.get(url, { params });

const basicSWR = <T extends Response>(
    url: string,
    params?: object,
    config?: SWRConfiguration<SWRResponse<T>, Error>,
): SWRHook<T> => {
    const { data, isLoading, mutate } = useSWR<SWRResponse<T>>([url, params ?? {}], swrFetcher, config);
    return [data?.data.data, isLoading, mutate];
};

const API = {
    login: async (email: string, password: string) => {
        const form = new FormData();
        form.set('email', email);
        form.set('password', password);
        return axiosClient.post<LoginResponse>('/admin/login', form);
    },
    useProduct: (stock_id: number, config?: SWRConfiguration) =>
        basicSWR<ProductResponse>('product/' + stock_id, {}, config),
    useProducts: (params: { limit: number; offset: number }, config?: SWRConfiguration) =>
        basicSWR<ProductsResponse>('product', params, config),
};

export default API;
