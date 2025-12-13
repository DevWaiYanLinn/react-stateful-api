import { useState } from 'react';
import axiosClient, { axiosCsrfClient, XError } from '@/lib/axiosClient';
import { useNavigate } from 'react-router';
import { sleep } from '@/lib/utils';
import { toast } from 'sonner';

export const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            await axiosCsrfClient.get('/sanctum/csrf-cookie');
            await axiosClient.post('/api/login', { email, password });
            await sleep(500);
            navigate('/home');
        } catch (err) {
            if (err instanceof XError) {
                toast.error(err.message, { position: 'top-center' });
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await axiosClient.get('/sanctum/csrf-cookie');
            await axiosClient.post('/api/logout');
            navigate('/login');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { loading, login, logout };
};
