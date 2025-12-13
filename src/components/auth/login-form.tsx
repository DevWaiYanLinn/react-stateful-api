import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';

export function LoginForm() {
    const [email, setEmail] = useState('test@example.com');
    const [password, setPassword] = useState('password');
    const { login } = useAuth();

    const handleSubmit = () => {
        login(email, password);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-md border-gray-200 shadow-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-semibold text-gray-900">Login</CardTitle>
                    <CardDescription className="text-gray-600">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-900">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-900">
                                    Password
                                </Label>
                                <a
                                    href="#"
                                    className="text-sm text-gray-600 hover:text-gray-900 underline-offset-4 hover:underline"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                            />
                        </div>

                        <Button onClick={handleSubmit} className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                            Login
                        </Button>

                        <p className="text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <a href="#" className="text-gray-900 font-medium hover:underline">
                                Sign up
                            </a>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
