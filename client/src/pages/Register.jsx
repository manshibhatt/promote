import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import newRequest from '../utils/newRequest';

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await newRequest.post("/auth/register", formData);
      console.log(res);
      navigate('/login');
    } catch (err) {
      console.log(err);
      const msg = err?.response?.data || "Something went wrong. Please try again.";
      setError(msg);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center text-black">Register</h2>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/3 -translate-y-1/2 p-1"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 text-gray-600" />
            ) : (
              <Eye className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#004d38] text-white py-2 rounded hover:bg-[#006c50] transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
}
