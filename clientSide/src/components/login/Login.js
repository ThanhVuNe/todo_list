import React, { useEffect, useState } from 'react'
import './login.css'
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token') || null;
        if (token != null) {
            navigate('/todo');
        }
        return;
    }, [])

    const Login = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            toast.error('Please fill all the fields');
            return;
        }
        if (password.length < 6) {
            toast.error('Password must be atleast 6 characters long');
            return;
        }

        const res = await fetch('http://localhost:2309/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, password
            })
        });
        const data = await res.json();

        if (res.status === 400 || !data) {
            toast.error('Please check username or password');
        } else {
            toast.success('Login Successfull');
            console.log(data);
            localStorage.setItem('token', JSON.stringify(data));
            setTimeout(() => {
                navigate('/todo');
                setUsername('');
                setPassword('');

            }, 1400);
        }
    }

    return (
        <div>
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h1 className="text text-large">Sign In</h1>
                            <p className="text text-normal">New user? <span>
                                <Link to={'/register'} style={{
                                    fontSize: '1rem',
                                    fontWeight: 400,
                                    color: 'blue',
                                }}>
                                    Create an account
                                </Link>


                            </span>
                            </p>
                        </div>
                        <form name="signin" className="form">
                            <div className="input-control">
                                <label for="email" className="input-label" hidden>Email Address</label>
                                <input type="text" value={username} name="email" id="email" className="input-field" placeholder="Username"
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }
                                    }
                                />
                            </div>
                            <div className="input-control">
                                <label for="password" className="input-label" hidden>Password</label>
                                <input value={password} type="password" name="password" id="password" className="input-field" placeholder="Password"
                                    onChange={(e) => { setPassword(e.target.value); }}
                                />
                            </div>
                            <div className="input-control">
                                <Link to={'/forgot'}>
                                    Forgot Password?
                                </Link>

                                <input onClick={Login} type="submit" name="submit" className="input-submit" value="Sign In" />
                            </div>
                        </form>

                    </section>
                </div>
            </main>
            <ToastContainer />
        </div>
    )
}

export default Login
