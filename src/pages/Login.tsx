import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { API_URL } from '@/lib/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { login, user } = useAuth();

    const redirect = location.state?.from?.pathname || '/';

    useEffect(() => {
        if (user) {
            navigate(redirect);
        }
    }, [navigate, user, redirect]);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            login(data);
            navigate(redirect);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 py-8 sm:py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-card border border-border rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8"
            >
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-muted-foreground text-sm sm:text-base">Sign in to your account</p>
                </div>

                <form onSubmit={submitHandler} className="space-y-5 sm:space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="email">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-styled pl-10 sm:pl-12 w-full min-h-[44px] text-sm sm:text-base"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-styled pl-10 sm:pl-12 w-full min-h-[44px] text-sm sm:text-base"
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        className="w-full btn-primary min-h-[44px] sm:min-h-[48px] text-sm sm:text-base"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin mr-2" />
                        ) : (
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        )}
                        Sign In
                    </Button>
                </form>

                <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm">
                    <p className="text-muted-foreground">
                        New Customer?{' '}
                        <Link to="/register" className="text-primary font-medium hover:underline">
                            Create an account
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
