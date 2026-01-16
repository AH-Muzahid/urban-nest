'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '@/services/authService';
import { MdEmail, MdLock, MdArrowForward } from 'react-icons/md';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-display">
      {/* Left: Image Section */}
      <div className="hidden lg:block relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuArVE9yx_RLpQUNHXarFP7mVi9egYBVaUerO0qijCCKoom3gWXVzV1PHQih6pMPCYaEEMQWV42nVnouBExtgrcIPaovevmLhZt2iW-JEYnTBkamGO75cTh0UuWgCkM1o-gkXtk9pJoJ_DILnVW37OJDt-9PunRhHbv94EInAQun2o-HTqDfJ0jyjErtiOtQH3y_0WEGXH2gXsCg-iOwWA3dhlOYZADzrCEoIvQoR3DXzqje_L6E-YLaceH2Rk5B-UZ_-hjuFiL9_LaU')" }}
        />
        <div className="absolute inset-0 bg-charcoal/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent"></div>

        <div className="absolute bottom-20 left-12 right-12 text-white">
          <h1 className="text-5xl font-black mb-6 leading-tight">Welcome to <br /><span className="text-[#d4af35]">UrbanNest</span></h1>
          <p className="text-xl text-gray-200">Experience the pinnacle of luxury living. Manage your properties, view insights, and discover exclusive listings.</p>
        </div>
      </div>

      {/* Right: Form Section */}
      <div className="flex items-center justify-center p-8 bg-background-light dark:bg-background-dark text-charcoal dark:text-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold">Sign In</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Enter your credentials to access your dashboard</p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-300 rounded-xl text-sm font-bold border border-red-100 dark:border-red-800/50">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Email Address
              </label>
              <div className="relative">
                <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl py-4 pl-12 pr-4 text-charcoal dark:text-white outline-none focus:border-[#d4af35] focus:ring-1 focus:ring-[#d4af35] transition-all font-medium placeholder:text-gray-400"
                  placeholder="name@urbannest.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-bold text-[#d4af35] hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl py-4 pl-12 pr-4 text-charcoal dark:text-white outline-none focus:border-[#d4af35] focus:ring-1 focus:ring-[#d4af35] transition-all font-medium placeholder:text-gray-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d4af35] hover:bg-[#b5952d] text-white font-bold py-4 rounded-xl shadow-xl shadow-[#d4af35]/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <MdArrowForward className="text-xl" />}
            </button>
          </form>

          <div className="text-center pt-4">
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-[#d4af35] font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
