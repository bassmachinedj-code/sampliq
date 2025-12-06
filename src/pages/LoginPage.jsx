import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music2, Mail, Lock, ArrowRight, Github } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login/signup logic here
    navigate('/dashboard');
  };

  const handleGoogleAuth = () => {
    // Handle Google authentication
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[100px] animate-float animation-delay-1000" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-3 mb-8 group">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-shadow duration-300">
              <Music2 className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -inset-1 rounded-xl bg-brand-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="font-display font-bold text-2xl text-white">
            Sampliq
          </span>
        </Link>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-display font-bold text-white mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-surface-400">
              {isSignUp ? 'Start searching samples instantly' : 'Sign in to your account'}
            </p>
          </div>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            <button
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-surface-800 text-white rounded-xl font-medium hover:bg-surface-700 transition-colors"
            >
              <Github className="w-5 h-5" />
              Continue with GitHub
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-surface-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-surface-900 text-surface-500">Or continue with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-surface-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-surface-800/50 border border-surface-700/50 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-surface-500 focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-surface-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-surface-800/50 border border-surface-700/50 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-surface-500 focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 transition-all"
                  required
                />
              </div>
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-end">
                <button type="button" className="text-sm text-brand-400 hover:text-brand-300 transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full btn btn-primary justify-center"
            >
              <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-surface-400">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-brand-400 hover:text-brand-300 font-medium transition-colors"
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </div>
        </motion.div>

        <p className="text-center text-sm text-surface-500 mt-6">
          By continuing, you agree to our{' '}
          <Link to="#" className="text-surface-400 hover:text-white transition-colors">Terms</Link>
          {' '}and{' '}
          <Link to="#" className="text-surface-400 hover:text-white transition-colors">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
