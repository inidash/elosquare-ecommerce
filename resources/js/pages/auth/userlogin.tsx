import EcommerceLayout from '@/layouts/ecom-layout';
import { Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff, HistoryIcon, TagIcon, TruckIcon } from 'lucide-react';
import { useState } from 'react';

export default function CustomerLogin() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('login');
    };

    return (
        // <EcommerceLayout title="Customer Login">
        <div className='bg-gray-100 '>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
                    {/* Login Form */}
                    <div className="md:w-1/2">
                        <div className="overflow-hidden rounded-lg text-black bg-white shadow-sm">
                            <div className="flex border-b items-center justify-center">
                                <Link href='/shop'>
                                    <img src="/logo.png" className='h-20 w-35' alt="logo" />
                                    <span className="text-4xl font-bold text-gray-700">Elosquare</span>
                                </Link>
                            </div>
                            <div className="border-b p-6 items-center flex flex-col">
                                <h2 className="text-lg font-semibold">Login</h2>
                                <p className="mt-1 text-gray-600">Welcome back! Sign in to your account.</p>
                            </div>
                            <div className="p-6">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="login-email" className="mb-2 block text-sm font-medium text-black">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="login-email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                            placeholder="your@email.com"
                                            required
                                        />
                                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                    </div>
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="login-password" className="mb-2 block text-sm font-medium text-gray-700">
                                                Password
                                            </label>
                                            <Link href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-800">
                                                Forgot Password?
                                            </Link>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                id="login-password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                className="w-full rounded-md border text-black border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                                placeholder="••••••••"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
                                            >
                                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                                    </div>
                                    <div className="mb-6 flex items-center">
                                        <input
                                            type="checkbox"
                                            id="remember-me"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                            Remember me
                                        </label>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {processing ? 'Signing In...' : 'Sign In'}
                                    </button>
                                </form>
                                <div className="mt-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-300"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <div className="mt-6 text-center">
                                                <p className="text-sm text-gray-600">
                                                    Don't have an account?{' '}
                                                    <a href={route('register')} className="font-medium text-indigo-600 hover:text-indigo-500">
                                                        Sign up
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="mt-12">
                    <h2 className="mb-6 text-xl font-semibold">Why Create an Account?</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 text-gray-700">
                        {/* Benefit 1 */}
                        <div className="rounded-lg border border-gray-100 text-gray-700 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                                <TruckIcon className="fas fa-truck text-xl text-indigo-600" />
                            </div>
                            <h3 className="mb-2 text-lg font-medium">Faster Checkout</h3>
                            <p className="text-gray-600">Save your shipping and payment details for quicker checkout on future orders.</p>
                        </div>
                        {/* Benefit 2 */}
                        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                                <HistoryIcon className="fas fa-history text-xl text-indigo-600" />
                            </div>
                            <h3 className="mb-2 text-lg font-medium">Order History</h3>
                            <p className="text-gray-600">Easily track and view all your past and current orders in one place.</p>
                        </div>
                        {/* Benefit 4 */}
                        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                                <TagIcon className="fas fa-tag text-xl text-indigo-600" />
                            </div>
                            <h3 className="mb-2 text-lg font-medium">Exclusive Deals</h3>
                            <p className="text-gray-600">Get access to member-only discounts and be the first to know about new promotions.</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        // </EcommerceLayout>
    );
}
