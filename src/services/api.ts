import axios from 'axios';
import { LoginResponse } from '../types/api';
import { API_URL } from '../utils/constants';

const axiosClient = axios.create({
    baseURL: API_URL,
    validateStatus: () => true,
});

const API = {
    login: async (email: string, password: string) => {
        const form = new FormData();
        form.set('email', email);
        form.set('password', password);
        return axiosClient.post<LoginResponse>('/admin/login', form);
    },
};

export default API;
