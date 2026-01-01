import { useContext, useState } from 'react';
import { LoginContext } from 'context/loginContext';
import { Link, useNavigate } from 'react-router';
import { getClientAuth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

type ToastState = {
    message: string;
    kind: 'error' | 'success';
} | null;

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState<boolean | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
    const [toast, setToast] = useState<ToastState>(null);
    const loginContext = useContext(LoginContext);

    const showToast = (nextToast: Exclude<ToastState, null>) => {
        setToast(nextToast);
        window.setTimeout(() => setToast(null), 5000);
    };

    const getAuthErrorMessage = (error: unknown): string => {
        const code = typeof error === 'object' && error !== null && 'code' in error
            ? String((error as { code?: unknown }).code)
            : undefined;

        switch (code) {
            case 'auth/invalid-api-key':
                return 'Firebase API key is invalid. Check your VITE_FIREBASE_* values in .env and restart `pnpm dev`.';
            case 'auth/invalid-credential':
            case 'auth/wrong-password':
            case 'auth/user-not-found':
                return 'Invalid email or password.';
            case 'auth/invalid-email':
                return 'Please enter a valid email address.';
            case 'auth/too-many-requests':
                return 'Too many attempts. Try again later.';
            case 'auth/network-request-failed':
                return 'Network error. Check your connection and try again.';
            default:
                return 'Sign-in failed. Please try again.';
        }
    };

    const login = async (): Promise<boolean> => {
        try {
            const auth = getClientAuth();
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in:', userCredential.user);

            loginContext?.setUser(userCredential.user);
            loginContext?.login();

            return true;
        } catch (error) {
            console.error('Error signing in:', error);
            showToast({ kind: 'error', message: getAuthErrorMessage(error) });
            return false;
        }
    };

    const handleSubmit = async () => {
        console.log('Login submitted:', { email, hasPassword: password.length > 0 });

        const nextErrors: { email?: string; password?: string; form?: string } = {};
        if (!email.trim()) nextErrors.email = 'Email is required.';
        if (!password) nextErrors.password = 'Password is required.';

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            setLoginSuccess(false);
            showToast({ kind: 'error', message: 'Please fix the highlighted fields.' });
            return;
        }

        setIsSubmitting(true);
        setErrors({});
        try {
            const ok = await login();
            setLoginSuccess(ok);
            if (!ok) {
                setErrors({ form: 'Invalid email or password.' });
                return;
            }
            navigate('/dashboard');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            {toast ? (
                <div className="fixed top-4 right-4 z-50">
                    <div
                        className={`max-w-sm rounded-lg border px-4 py-3 shadow-lg ${toast.kind === 'error'
                            ? 'bg-red-50 border-red-200 text-red-800'
                            : 'bg-green-50 border-green-200 text-green-800'
                            }`}
                        role="status"
                        aria-live="polite"
                    >
                        <div className="flex items-start gap-3">
                            <p className="text-sm leading-5">{toast.message}</p>
                            <button
                                type="button"
                                onClick={() => setToast(null)}
                                className="ml-auto text-sm font-medium opacity-70 hover:opacity-100"
                                aria-label="Dismiss notification"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
            <div className="w-full max-w-md">
                {/* Floating Island Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 transform transition-all hover:shadow-3xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <img src="../../assets/logo.png" alt="Logo" className="mx-auto mb-4 w-50 h-50" />
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                        <p className="text-gray-500">Sign in to your account</p>
                    </div>

                    {/* Login Inputs */}
                    <div className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition ${errors.email || loginSuccess === false ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                                placeholder="you@example.com"
                            />
                            {errors.email ? (
                                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                            ) : null}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSubmit();
                                    }
                                }}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition ${errors.password || loginSuccess === false ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                            />
                            {errors.password ? (
                                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                            ) : null}
                        </div>

                        {/* Forgot Password Link */}
                        <div className="text-right">
                            <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 transition">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={handleSubmit}
                            type="button"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Signing In...' : 'Sign In'}
                        </button>
                        {errors.form ? (
                            <p className="text-sm text-red-600 text-center">{errors.form}</p>
                        ) : null}
                    </div>

                    {/* Divider */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium transition">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default LoginPage;