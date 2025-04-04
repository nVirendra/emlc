import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { registerUser } from '../../services/auth.service';
import { registerSchema } from '../../schemas/auth.schema';
import { toast } from 'react-toastify';

const Register: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = registerSchema.safeParse(form);
    if (!result.success) {
      result.error.errors.forEach((err) => toast.error(err.message));
      return;
    }

    try {
      setLoading(true);
      const { data } = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      login(data.user, data.token);
      toast.success('Registration successful!');
      navigate('/');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Registration failed');
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
              'url(https://source.unsplash.com/featured/?startup,team)',
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
            Create an Account
          </h2>
          <p className="text-white/80">Start your journey with us today.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition duration-300 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="text-sm text-white/80 text-center">
            Already have an account?{' '}
            <Link
              to="/login"
              className="underline text-white hover:text-purple-300"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
