import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import logo from "@/assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Cookies from 'js-cookie';

export default function LoginPage() {
    const [form, setForm] = useState({
        email: Cookies.get('rememberedEmail') || "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(!!Cookies.get('rememberedEmail'));
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const checkLogin = Cookies.get('adminToken');
        if (checkLogin) {
            navigate('/mgt');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!form.email.trim()) {
            toast.error('Please enter your email address');
            return;
        }
        if (!form.password) {
            toast.error('Please enter your password');
            return;
        }

        setLoading(true);

        try {
            const result = await login(form.email, form.password);

            if (result.success) {
                if (rememberMe) {
                    Cookies.set('rememberedEmail', form.email, {
                        expires: 30,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict',
                        path: '/'
                    });
                } else {
                    Cookies.remove('rememberedEmail', { path: '/' });
                }

                toast.success('Login successful! Redirecting...');
                setTimeout(() => navigate('/mgt'), 1000);
            } else {
                toast.error(result.message || 'Invalid email or password');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
            <Toaster position="top-right" />

            <div className="w-full max-w-md">
                <Card className="bg-white shadow-2xl border-0 rounded-2xl overflow-hidden">
                    <CardContent className="p-8">
                        {/* Logo & Header */}
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-linear-to-br from-[#C57712] to-[#e0962c] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <img src={logo} alt="Oweetu Gorilla Holidays" className="w-18 h-18 object-contain" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
                            <p className="text-gray-500 text-sm mt-1">Sign in to manage your safari business</p>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email Field */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700 block mb-2">
                                    Email Address
                                </label>
                                <Input
                                    type="email"
                                    placeholder="Enter user email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    required
                                    className="border-gray-300 focus:border-[#C57712] focus:ring-2 focus:ring-[#C57712]/20 h-11"
                                    autoComplete="email"
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700 block mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        required
                                        className="border-gray-300 focus:border-[#C57712] focus:ring-2 focus:ring-[#C57712]/20 pr-11 h-11"
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C57712] transition-colors focus:outline-none"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 text-[#C57712] rounded border-gray-300 focus:ring-[#C57712] focus:ring-1"
                                    />
                                    <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                                        Remember me
                                    </span>
                                </label>
                                <a
                                    href="#"
                                    className="text-sm text-[#C57712] hover:text-[#a5630e] transition-colors"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toast.error('Please contact administrator to reset password');
                                    }}
                                >
                                    Forgot password?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full bg-linear-to-r from-[#C57712] to-[#e0962c] hover:from-[#a5630e] hover:to-[#C57712] text-white font-semibold h-11 mt-6 shadow-md hover:shadow-lg transition-all duration-200"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Signing in...
                                    </span>
                                ) : (
                                    "Login to Dashboard"
                                )}
                            </Button>
                        </form>

                        {/* Security Note */}
                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <div className="text-center">
                                <p className="text-xs text-gray-500">
                                    Secure management area. All access is logged and monitored.
                                </p>
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="text-center mt-6">
                            <p className="text-xs text-gray-400">
                                © {new Date().getFullYear()} Oweetu Gorilla Holidays. All rights reserved.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}