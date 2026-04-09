import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import logo from "@/assets/logo.png"
import { FaEye } from "react-icons/fa6";
import { TbEyeCancel } from "react-icons/tb";
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

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

            toast.success('Login successful!');
            setTimeout(() => navigate('/mgt'), 1000);
        } else {
            toast.error(result.message);
        }

        setLoading(false);
    };

    return (
        <div className="h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 p-4">
            <Toaster position="top-right" />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-md shadow-2xl rounded-2xl">
                <Card className="bg-white">
                    <CardContent className="p-8 space-y-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <img src={logo} alt="logo" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800">Oweetu Admin</h1>
                            <p className="text-gray-500 text-sm mt-1">Sign in to manage your safari business</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1">Email Address</label>
                                <Input type="email" placeholder="example@host.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="border-gray-300 focus:border-amber-400" />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
                                <div className="relative">
                                    <Input type={showPassword ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required className="border-gray-300 focus:border-amber-400 pr-10" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-600 transition-colors focus:outline-none" title={showPassword ? "Hide password" : "Show password"}>
                                        {showPassword ? (
                                            <TbEyeCancel className="w-4 h-4" />
                                        ) : (
                                            <FaEye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500" />
                                    <span className="text-sm text-gray-600">Remember me</span>
                                </label>
                                <a href="#" className="text-sm text-amber-600 hover:text-amber-700">
                                    Forgot password?
                                </a>
                            </div>

                            <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white mt-8" disabled={loading}>
                                {loading ? "Signing in..." : "Login"}
                            </Button>
                        </form>

                        <div className="text-center text-xs text-gray-500">
                            <p>Default admin: development@oweetugorillaholidays.com</p>
                            <p>© {new Date().getFullYear()} Oweetu Gorilla Holidays</p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}