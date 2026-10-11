import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User as UserIcon,
  Mail,
  Lock,
  Phone,
  UserPlus,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Card, Button, Input } from '../components/ui';
import { firebaseAuthService, formatAuthError } from '../services/firebaseAuth';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your Full Name.');
      return;
    }

    const cleanMobile = mobile.replace(/[\s-]/g, '');
    if (cleanMobile.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    setIsLoading(true);

    try {
      // Execute Real Firebase Email & Password Registration
      await firebaseAuthService.registerWithEmail(cleanEmail, password, name.trim());
      setIsLoading(false);
      setSuccessMessage(true);

      setTimeout(() => {
        navigate('/');
      }, 600);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(formatAuthError(err));
    }
  };

  return (
    <div className="max-w-md mx-auto py-8 space-y-6">
      <Card className="shadow-md border border-slate-200 p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-amber-100 text-amber-900 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-2xs">
            <UserPlus className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Create Your Account
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Register to book tickets and manage your journeys.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Account created successfully! Redirecting...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name *"
            placeholder="e.g. John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={<UserIcon className="w-5 h-5 text-slate-400" />}
            required
          />

          <Input
            label="Mobile Number *"
            type="tel"
            placeholder="e.g. 9876543210"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            icon={<Phone className="w-5 h-5 text-slate-400" />}
            required
          />

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
            placeholder="Minimum 6 characters"
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

          <Input
            label="Confirm Password *"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={<Lock className="w-5 h-5 text-slate-400" />}
            rightAction={
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="text-slate-400 hover:text-slate-600 focus:outline-none focus:text-slate-700 cursor-pointer p-1 rounded-md"
                aria-label={
                  showConfirmPassword
                    ? 'Hide confirm password'
                    : 'Show confirm password'
                }
                title={
                  showConfirmPassword
                    ? 'Hide confirm password'
                    : 'Show confirm password'
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Eye className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            }
            required
          />

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            disabled={isLoading}
            className="w-full text-base font-bold py-3 mt-2 bg-amber-400 hover:bg-amber-300 text-blue-950 border-0 shadow-md"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-200 text-center text-slate-600 text-sm font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-700 font-bold hover:underline">
            Login
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
