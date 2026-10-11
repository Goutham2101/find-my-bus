import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bus, Mail, Lock, Phone, KeyRound } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [activeTab, setActiveTab] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('barat@example.com');
  const [password, setPassword] = useState('password123');
  const [phone, setPhone] = useState('9876543210');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Login failed. Check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError('Please enter valid 10-digit phone number');
      return;
    }
    setOtpSent(true);
    setError('');
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(`${phone}@phone.auth`, 'phone123');
      navigate('/');
    } catch (err: any) {
      setError('Invalid OTP code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center mx-auto shadow-md">
            <Bus className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Welcome Back</h1>
          <p className="text-xs text-slate-500 font-medium">
            Log in to manage bookings and track live APSRTC buses
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('email')}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'email' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Email & Password
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('otp')}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'otp' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Mobile OTP Login
          </button>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold p-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Email Form */}
        {activeTab === 'email' ? (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 hover:text-blue-700 cursor-pointer font-medium">
                Forgot Password?
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-md transition-colors"
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        ) : (
          /* Phone OTP Form */
          <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-4">
            {!otpSent ? (
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Enter 6-Digit OTP Code
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="Enter 123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold tracking-widest text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-md transition-colors"
            >
              {!otpSent ? 'Send OTP Code' : 'Verify & Log In'}
            </button>
          </form>
        )}

        {/* Firebase / Google Auth Demo Placeholder */}
        <div className="pt-4 border-t border-slate-100 text-center space-y-3">
          <p className="text-xs text-slate-400">Or continue with social sign in</p>
          <button
            type="button"
            onClick={handleEmailLogin}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <span>Google Account</span>
          </button>
        </div>

        <p className="text-xs text-center text-slate-500 font-medium">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-700 font-bold hover:underline">
            Register Account
          </Link>
        </p>
      </div>
    </div>
  );
};
