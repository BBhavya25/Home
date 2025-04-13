import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import '../index.css';  // Import the CSS file

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state to indicate request is in progress
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = async () => {
        // Validate input fields
        if (!formData.username || !formData.email || !formData.password) {
            setError('All fields are required');
            return;
        }

        setLoading(true); // Start loading when the request is being made
        setError(''); // Clear any previous errors

        try {
            // Make the POST request to the backend using axios
            const response = await axios.post('http://localhost:5000/api/signup', formData);

            console.log(response);

            if (response.status === 201) {
                alert('User created successfully');
                // Successful signup, navigate to login page
                navigate('/login');
            }
        } catch (err) {

            if(err.response && err.response.data && err.response.data.msg) {
                setError(err.response.data.msg);
            } else {
            // Handle errors (e.g., network issues, API errors)
            setError('Signup failed. Please try again.');
            }
        } finally {
            setLoading(false); // Stop loading when the request is done
        }
    };

    const handleLoginRedirect = () => {
        // Navigate to the login page when the user clicks on the login link
        navigate('/login');
    };

    return (
        <div className="auth-container">
        <div className="auth-box">
            <h1 className="auth-title">Sign Up</h1>
            {error && <p className="auth-error">{error}</p>}
            
            <div className="input-group">
                <input
                    className="auth-input"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </div>
            
            <div className="input-group">
                <input
                    className="auth-input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
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
                />
            </div>
            
            <button 
                className="auth-button" 
                onClick={handleSignup} 
                disabled={loading}
            >
                {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
            
            <p className="auth-text">
                Already have an account? 
                <span className="auth-link" onClick={handleLoginRedirect}>
                    Login here
                </span>
            </p>
        </div>
    </div>
    );
};

export default Signup;
