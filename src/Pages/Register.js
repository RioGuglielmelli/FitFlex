import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles/Login-Register.css';
import FitFlexName from '../images/FitFlexName.svg';
import symbol from '../images/symbol.svg';
import { registerUser } from '../utils/api';

const Register = () => {
    const [formData, setFormData] = useState({ email: '', password: '', firstName: '', lastName: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(formData.email, formData.password, formData.firstName, formData.lastName);
            if (response) {
                setMessage('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setMessage('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Registration failed');
        }
    };

    return (
        <div className="center">
            <div className="form-container">
                <img src={symbol} alt="FitFlex" className="fitflex-logo" />
                <img src={FitFlexName} alt="FitFlex" className="fitflex-name" />
                <form onSubmit={handleSubmit}>
                    <ul>
                        <li><Link to="/login">Sign In</Link></li>
                        <li className="active"><Link to="/register">Sign Up</Link></li>
                    </ul>
                    <div className="form-input-group">
                        <label htmlFor="firstName">First Name</label>
                        <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div className="form-input-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} required />
                    </div>
                    <div className="form-input-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-input-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <Button className="blue-btn" type="submit">Register</Button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Register;
