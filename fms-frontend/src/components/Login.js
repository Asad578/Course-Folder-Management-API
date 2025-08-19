import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('student');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', {
                email,
                password,
                user_type: userType,
            });

            // Save token and user info in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user_type', response.data.user_type);
            localStorage.setItem('role', response.data.role);

            // Redirect based on role
            if (response.data.user_type === 'faculty') {
                switch (response.data.role) {
                    case 'hod':
                        navigate('/hod-dashboard');
                        break;
                    case 'manager':
                        navigate('/manager-dashboard');
                        break;
                    case 'qch':
                        navigate('/qch-dashboard');
                        break;
                    case 'instructor':
                        navigate('/instructor-dashboard');
                        break;
                    default:
                        navigate('/faculty-dashboard');
                }
            } else if (response.data.user_type === 'student') {
                navigate('/student-dashboard');
            }
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2 className="login-title">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                <select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    className="login-select"
                >
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                </select>
                <button onClick={handleLogin} className="login-button">
                    Login
                </button>
            </div>
        </div>

    );
};

export default Login;