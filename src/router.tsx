import { createBrowserRouter } from 'react-router';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import { loadInitialData, redirectGuestTo } from './lib/loader';
import Root from './Root';
import Calendar from './pages/calendar';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        loader: loadInitialData,
        children: [
            {
                index: true,
                path: '/home',
                Component: HomePage,
            },
            {
                path: '/calendar',
                Component: Calendar,
            },
        ],
    },
    {
        path: '/login',
        Component: LoginPage,
        loader: redirectGuestTo,
    },
]);
