import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/auth.service';
import { useAuth } from '../../context/AuthContext';
import { loginSchema } from '../../schemas/auth.schema';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      result.error.errors.forEach((err) => toast.error(err.message));
      return;
    }
    setLoading(true);
    try {
      const { data } = await loginUser({ email, password });
      login(data.user, data.token);
      toast.success('Login successful!');
      navigate('/');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="flex flex-col md:flex-row items-center w-full max-w-5xl bg-white/20 dark:bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
        {/* Left Visual */}
        <div
          className="hidden md:block w-full md:w-1/2 h-96 md:h-full bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://source.unsplash.com/featured/?technology,code)',
          }}
        />

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-10 space-y-6">
          {/* E-milo Logo */}
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-white tracking-wide">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 px-3 py-1 rounded-xl shadow-md">
                E-milo
              </span>
            </h1>
          </div>

          <h2 className="text-4xl font-extrabold text-white">
            Welcome Back 👋
          </h2>
          <p className="text-white/80">
            Please enter your credentials to sign in.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition duration-300"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="text-sm text-white/80 text-center">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              className="underline text-white hover:text-purple-300"
            >
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
