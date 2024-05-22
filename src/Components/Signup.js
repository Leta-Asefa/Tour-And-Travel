import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../output.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role:'guide'
    });
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const history=useHistory()


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('handle submit called')

        fetch('http://localhost:4000/auth/signup', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                console.log('Response data:', data);
                if (typeof data.error === 'undefined') {
                    if (data.role === 'admin')
                        history.push('/', { user: { username: data.username } })
                    if (data.role = 'guide')
                        history.push('/sitelist', { user: { username: data.username } })
                    if (data.role === 'visitor')
                        history.push('/sitelist', { user: { username: data.username } })
                }
                else {
                    setError(data)
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });



    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2 className="signup-title">Sign Up</h2>
                <input
                    type="text"
                    name="username"
                    className="signup-input"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    className="signup-input"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <div className='error-box'>{error && error.error.email}</div>
                <input
                    type="password"
                    name="password"
                    className="signup-input"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <div className='error-box'>{error && error.error.password}</div>
                <button
                    type="submit"
                    className="signup-button"
                >
                    Sign Up
                </button>
                <div className="text-center">
                    <a href='/login' className="signup-link">
                        Already have an account? Login
                    </a>
                </div>
            </form>

            { data && <div>Welcom {data}</div>}
        </div>
    );
};

export default Signup;
