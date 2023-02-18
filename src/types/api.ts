export type Response<T = any> = {
    data: T | null;
    errors: string[] | null;
};

export type LoginResponse = Response<string>;
