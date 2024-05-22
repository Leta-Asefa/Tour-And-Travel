import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { UserContext } from './UserContext';

import '../output.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const history = useHistory()
    const {setName}=useContext(UserContext)


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('handle submit called')

        fetch('http://localhost:4000/auth/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials:'include',
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
                    if (data.role === 'admin') {
                        setName(data.username)
                        history.push('/')
                    }
                    if (data.role === 'guide')
                        history.push('/sitelist' )
                    if (data.role === 'visitor')
                        history.push('/sitelist' )
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
                <h2 className="signup-title">Login</h2>
               
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
                    Login
                </button>
                <div className="text-center">
                     <NavLink to="/signup" className="signup-link">
                        Create an account ? Signup Here
                    </NavLink>
                </div>
            </form>

            { data && <div>Welcom {data}</div>}
        </div>
    );
};

export default Login;
