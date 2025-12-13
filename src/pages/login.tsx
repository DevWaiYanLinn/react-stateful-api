import { LoginForm } from '@/components/auth/login-form';
import { Toaster } from 'sonner';

export default function LoginPage() {
    return (
        <>
            <Toaster />
            <LoginForm />
        </>
    );
}
