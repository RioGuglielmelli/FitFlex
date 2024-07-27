import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles/Login-Register.css';
import FitFlexName from '../images/FitFlexName.svg';
import symbol from '../images/symbol.svg';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('accessToken', data.token);
                setMessage('Login successful! Redirecting to dashboard...');
                setTimeout(() => navigate('/dashboard'), 2000);
            } else {
                setMessage(data.error || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Login failed');
        }
    };

    return (
        <div className="center">
            <div className="form-container">
                <img src={symbol} alt="FitFlex" className="fitflex-logo" />
                <img src={FitFlexName} alt="FitFlex" className="fitflex-name" />
                <form onSubmit={handleSubmit}>
                    <ul>
                        <li className="active"><Link to="/login">Sign In</Link></li>
                        <li><Link to="/register">Sign Up</Link></li>
                    </ul>
                    <div className="form-input-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-input-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <Button className="blue-btn" type="submit">Login</Button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Login;
