import { useState, useContext } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate} from 'react-router-dom';
import newRequest from '../utils/newRequest';
import { useEffect } from 'react';
import {AuthContext} from "../context/AuthContext"

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {updateUser} = useContext(AuthContext)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      }, { withCredentials: true });

      const { password, ...userWithoutPassword } = res.data;
      updateUser(userWithoutPassword); 
      navigate('/');
    } catch (err) {
      const errorMessage = err.response.data || "Something went wrong!";
      setError(errorMessage); 
    }
  };


  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-6 border rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Login</h2>

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
            className="w-full mb-4 px-4 py-2 pr-10 border border-gray-300 rounded focus:outline-none"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2/5 transform -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 text-gray-600" />
            ) : (
              <Eye className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#004d38] text-white py-2 rounded hover:opacity-90"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center text-black">
          Not registered?{' '}
          <button
            type="button"
            className="text-[#004d38] font-semibold underline"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
}
  ; 