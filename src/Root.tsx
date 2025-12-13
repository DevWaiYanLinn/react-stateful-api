import { Outlet, useLoaderData } from 'react-router';
import { Toaster } from 'sonner';
import { SWRConfig } from 'swr';
import Navbar from './components/nav-bar';
import axiosClient from './lib/axiosClient';

export default function Root() {
    const { cart, user } = useLoaderData();
    return (
        <>
            <Toaster />
            <div className="min-h-screen bg-gray-50">
                <SWRConfig
                    value={{
                        fallback: {
                            '/api/carts/user': cart,
                            '/api/user': user,
                        },
                        fetcher: (url, init) => axiosClient.get(url, init).then((res) => res.data.data),
                    }}
                >
                    <Navbar />
                    <Outlet />
                </SWRConfig>
            </div>
        </>
    );
}
