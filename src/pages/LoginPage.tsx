import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, Info, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { Card, Button, Input } from '../components/ui';
import { firebaseAuthService, formatAuthError } from '../services/firebaseAuth';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Forgot Password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [isForgotLoading, setIsForgotLoading] = useState(false);
  const [forgotSuccessMessage, setForgotSuccessMessage] = useState('');
  const [forgotErrorMessage, setForgotErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);

    try {
      // Execute Real Firebase Email & Password Login
      await firebaseAuthService.loginWithEmail(cleanEmail, password);
      setIsLoading(false);
      navigate(from, { replace: true });
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(formatAuthError(err));
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSuccessMessage('');
    setForgotErrorMessage('');

    const cleanEmail = forgotEmail.trim();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setForgotErrorMessage('Please enter a valid registered email address.');
      return;
    }

    setIsForgotLoading(true);

    try {
      await firebaseAuthService.sendPasswordReset(cleanEmail);
      setIsForgotLoading(false);
      setForgotSuccessMessage(
        `Password reset email sent to ${cleanEmail}. Please check your inbox.`
      );
    } catch (err: any) {
      setIsForgotLoading(false);
      if (err.message && err.message.includes('demo mode')) {
        setForgotErrorMessage(err.message);
      } else {
        setForgotErrorMessage(formatAuthError(err));
      }
    }
  };

  return (
    <div className="max-w-md mx-auto py-8 space-y-6">
      <Card className="shadow-md border border-slate-200 p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-blue-100 text-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-2xs">
            <LogIn className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Welcome Back
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Sign in to access your bookings and travel preferences.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address *"
            type="email"
            placeholder="e.g. user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="w-5 h-5 text-slate-400" />}
            required
          />

          <Input
            label="Password *"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock className="w-5 h-5 text-slate-400" />}
            rightAction={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-slate-400 hover:text-slate-600 focus:outline-none focus:text-slate-700 cursor-pointer p-1 rounded-md"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Eye className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            }
            required
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                setShowForgotModal(true);
                setForgotEmail(email);
                setForgotSuccessMessage('');
                setForgotErrorMessage('');
                setIsForgotLoading(false);
              }}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            disabled={isLoading}
            className="w-full text-base font-bold py-3 mt-2 bg-blue-700 hover:bg-blue-800 text-white shadow-md"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-200 text-center text-slate-600 text-sm font-medium">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-700 font-bold hover:underline">
            Create an Account
          </Link>
        </div>
      </Card>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => {
              if (!isForgotLoading) setShowForgotModal(false);
            }}
          />
          <div className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 text-slate-900 z-10 border border-slate-200">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Forgot Password</h3>
                <p className="text-xs text-slate-500">Reset password request</p>
              </div>
            </div>

            {forgotSuccessMessage ? (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-emerald-900 text-xs font-semibold leading-relaxed flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{forgotSuccessMessage}</span>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enter your registered email address to receive a password reset link.
                </p>

                {forgotErrorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{forgotErrorMessage}</span>
                  </div>
                )}

                <Input
                  label="Registered Email Address *"
                  type="email"
                  placeholder="e.g. user@example.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  icon={<Mail className="w-5 h-5 text-slate-400" />}
                  required
                />

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    variant="outline"
                    size="sm"
                    disabled={isForgotLoading}
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    isLoading={isForgotLoading}
                    disabled={isForgotLoading}
                    className="font-bold bg-blue-700 text-white hover:bg-blue-800"
                  >
                    {isForgotLoading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                </div>
              </form>
            )}

            {forgotSuccessMessage && (
              <div className="flex justify-end pt-2">
                <Button
                  onClick={() => setShowForgotModal(false)}
                  variant="outline"
                  size="sm"
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;

