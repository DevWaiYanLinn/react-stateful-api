// axiosClient.ts
import axios from 'axios';

export const axiosCsrfClient = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
});

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

interface ErrParameter {
    message: string | undefined;
    status: number;
    data: any;
}

export class XError extends Error {
    public readonly status: number;
    public readonly data: any;
    constructor(e: ErrParameter) {
        super(e.message);
        this.status = e.status;
        this.data = e.data;
    }
}

axiosClient.interceptors.request.use(
    async (config) => {
        // if (config.method === 'post') {
        //     await csrfClient.get('/sanctum/csrf-cookie');
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        let formattedError = {
            message: 'Something went wrong',
            status: 500,
            data: null,
        };

        if (error.response) {
            formattedError = {
                message: error.response.data?.message || error.message,
                status: error.response.status,
                data: error.response.data || null,
            };
        } else if (error.request) {
            formattedError = {
                message: 'No response from server',
                status: 0,
                data: null,
            };
        } else {
            formattedError = {
                message: error.message,
                status: 500,
                data: null,
            };
        }

        return Promise.reject(new XError(formattedError));
    }
);

export default axiosClient;
