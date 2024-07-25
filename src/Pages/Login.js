import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles/Login-Register.css';
import FitFlexName from '../images/FitFlexName.svg';
import symbol from "../images/symbol.svg";

const Login = () => {
    return (
        <div className="center">
            <div className="form-container">
                <img src={symbol} alt="FitFlex" className="fitflex-logo" />
                <img src={FitFlexName} alt="FitFlex" className="fitflex-name" />
                <form>
                    <ul>
                        <li className="active"><Link to="/login">Sign In</Link></li>
                        <li><Link to="/register">Sign Up</Link></li>
                    </ul>
                    <div className="form-input-group">
                        <label htmlFor="username">Username</label>
                        <input id="username" name="username" type="text" required />
                    </div>
                    <div className="form-input-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" required />
                    </div>
                    <Button className="blue-btn" type="submit">Login</Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
