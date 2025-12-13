import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { LogIn, LogOut, ShoppingBag } from 'lucide-react';
import { NavLink } from 'react-router';
import useSWR from 'swr';
export default function Navbar() {
    const { logout } = useAuth();
    const { data: user } = useSWR('/api/user', null, {
        revalidateOnMount: false,
    });

    const { data: cart } = useSWR('/api/carts/user', null, {
        revalidateOnMount: false,
    });

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="border-b bg-white">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        {/* <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900">
                            <span className="text-xl font-bold text-white">L&B</span>
                        </div> */}
                        <span className="text-xl font-semibold text-gray-900">Good Vibe</span>
                    </div>
                    <div className="gap-3 flex items-center">
                        <Button variant="outline" size="sm" className="border-gray-900 text-gray-900">
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            Cart {cart === null ? 0 : cart['cart_detail'].length}
                        </Button>
                        {/* Logout Button - Right Side */}
                        {user ? (
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={handleLogout}
                                className="flex items-center space-x-2"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </Button>
                        ) : (
                            <Button asChild variant="default" size="sm" className="flex items-center space-x-2">
                                <NavLink to={'/login'}>
                                    <LogIn className="h-4 w-4" />
                                    <span>Login</span>
                                </NavLink>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
