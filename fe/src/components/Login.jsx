import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import '../index.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async () => {
        if (!formData.email || !formData.password) {
            setError('Both fields are required');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/login', formData);

            if (response.data && response.data.userId) {
                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify({
                    userId: response.data.userId,
                    username: response.data.username,
                    email: formData.email
                }));
                
                // Update auth context
                login({
                    userId: response.data.userId,
                    username: response.data.username
                });
                
                alert('Login successful');
                navigate('/home');
            } else {
                setError('Login failed - no user data received');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.msg) {
                setError(err.response.data.msg);
            } else {
                setError('Login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSignUpRedirect = () => {
        navigate('/signup');
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h1 className="auth-title">Login</h1>
                {error && <p className="auth-error">{error}</p>}
                
                <div className="input-group">
                    <input
                        className="auth-input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="input-group">
                    <input
                        className="auth-input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <button 
                    className="auth-button" 
                    onClick={handleLogin} 
                    disabled={loading}
                >
                    {loading ? 'Logging In...' : 'Login'}
                </button>
                
                <p className="auth-text">
                    Don't have an account? 
                    <span className="auth-link" onClick={handleSignUpRedirect}>
                        Sign up here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;