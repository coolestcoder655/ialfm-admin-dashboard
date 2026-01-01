import { useState, useContext } from 'react';
import { Link } from 'react-router';
import { LoginContext } from 'context/loginContext';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const loginContext = useContext(LoginContext);

    const handleSubmit = () => {
        console.log('Forgot password submitted:', { email });
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Floating Island Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 transform transition-all hover:shadow-3xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <img src="../../assets/logo.png" alt="Logo" className="mx-auto mb-4 w-50 h-50" />
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password</h1>
                        <p className="text-gray-500">Enter your email address to reset your password</p>
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="you@example.com"
                            />
                        </div>

                        {/* Forgot Password Link */}
                        <div className="text-right">
                            <Link to="/" className="text-sm text-blue-600 hover:text-blue-800 transition">
                                Remembered your password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition transform hover:scale-105"
                        >
                            Submit
                        </button>
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
        </div>
    );
};

export default LoginPage;