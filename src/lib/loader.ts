import { redirect } from 'react-router';
import axiosClient from './axiosClient';

export async function redirectGuestTo() {
    try {
        await axiosClient.get('/api/user');
        return redirect('/home');
    } catch {
        return { user: null };
    }
}

export async function loadInitialData() {
    const {
        data: { data: cart },
    } = await axiosClient.get('/api/carts/user');
    try {
        const {
            data: { data: user },
        } = await axiosClient.get('/api/user');
        return { user, cart };
    } catch {
        return { user: null, cart };
    }
}

export async function redirectUserTo() {
    try {
        const {
            data: { date: user },
        } = await axiosClient.get('/api/user');
        return { user };
    } catch {
        return redirect('/login');
    }
}
