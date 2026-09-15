import { useState, type FormEvent } from 'react';
import { Activity, Mail, Lock, LogIn, UserCog, Info, ArrowLeft } from 'lucide-react';
import { useRouter } from '@/context/RouterContext';
import { useApp } from '@/context/AppContext';
import { showToast } from '@/components/Toast';
import type { Role } from '@/types';

interface LoginProps {
  role: 'patient' | 'staff';
}

export function LoginPage({ role }: LoginProps) {
  const { navigate } = useRouter();
  const { loginPatient, loginStaff } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const isPatient = role === 'patient';
  const loginFn = isPatient ? loginPatient : loginStaff;
  const dashboardPath = isPatient ? '/patient-dashboard' : '/staff-dashboard';

  const demoCreds = isPatient
    ? { email: 'john@patient.com', password: 'patient123' }
    : { email: 'staff@hospital.com', password: 'staff123' };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const result = loginFn(email, password);
    if (result.success) {
      showToast('success', `Welcome back! Logged in successfully as ${isPatient ? 'patient' : 'staff'}.`);
      navigate(dashboardPath);
    } else {
      showToast('error', result.error ?? 'Login failed. Please check your credentials.');
    }
  };

  const fillDemo = () => {
    setEmail(demoCreds.email);
    setPassword(demoCreds.password);
    setErrors({});
  };

  const accentColor = isPatient ? 'sky' : 'blue';
  const Icon = isPatient ? LogIn : UserCog;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className={`bg-gradient-to-r ${isPatient ? 'from-sky-500 to-sky-600' : 'from-blue-500 to-blue-700'} p-8 text-center`}>
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">
                {isPatient ? 'Patient Login' : 'Staff Login'}
              </h1>
              <p className="text-sky-100 text-sm mt-1">
                {isPatient ? 'Access your lab reports and health information' : 'Manage patient reports and data'}
              </p>
            </div>

            {/* Form */}
            <div className="p-8">
              {/* Demo credentials hint */}
              <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <div className="text-xs text-amber-700">
                    <p className="font-semibold mb-1">Demo Credentials ({isPatient ? 'Patient' : 'Staff'}):</p>
                    <p>Email: <span className="font-mono">{demoCreds.email}</span></p>
                    <p>Password: <span className="font-mono">{demoCreds.password}</span></p>
                    <button onClick={fillDemo} className="mt-2 text-amber-700 font-semibold underline hover:text-amber-800">
                      Auto-fill credentials
                    </button>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? 'border-red-300 focus:ring-red-200'
                          : 'border-slate-200 focus:border-sky-400 focus:ring-sky-100'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.password
                          ? 'border-red-300 focus:ring-red-200'
                          : 'border-slate-200 focus:border-sky-400 focus:ring-sky-100'
                      }`}
                    />
                  </div>
                  {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                </div>

                <button
                  type="submit"
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all shadow-lg hover:shadow-xl ${
                    isPatient
                      ? 'bg-sky-500 hover:bg-sky-600 shadow-sky-200'
                      : 'bg-blue-500 hover:bg-blue-600 shadow-blue-200'
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-500">
                  {isPatient ? 'Are you a staff member?' : 'Are you a patient?'}{' '}
                  <button
                    onClick={() => navigate(isPatient ? '/staff-login' : '/patient-login')}
                    className={`font-semibold text-${accentColor}-600 hover:text-${accentColor}-700`}
                  >
                    {isPatient ? 'Staff Login' : 'Patient Login'}
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6 text-slate-400">
            <Activity className="w-4 h-4" />
            <span className="text-xs">Lab Report Management System</span>
          </div>
        </div>
      </div>
    </div>
  );
}
