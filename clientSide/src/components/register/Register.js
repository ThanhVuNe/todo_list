import React, { useState } from 'react'
import '../login/login.css'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const register = async (e) => {
        e.preventDefault();
        if (!username || !password || !cpassword) {
            toast.error('Please fill all the fields');
            return;
        }
        if (password.length < 6) {
            toast.error('Password must be atleast 6 characters long');
            return;
        }
        if (password !== cpassword) {
            toast.error('Password and Confirm Password must be same');
            return;
        }

        const res = await fetch('http://localhost:2309/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, password
            })
        });
        const data = await res.json();
        console.log(data);
        if (res.status === 400 || !data) {
            console.log('Invalid Registration');
            toast.error('Username already exists, Please try another username');
            return;
        } else {
            toast.success('Register Successfull, Please login');
            setUsername('');
            setPassword('');
            setCpassword('');
        }
    }

    return (
        <div>
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h1 className="text text-large">Register</h1>
                            <p className="text text-normal">Have an account? <span>
                                <Link to={'/login'} style={{
                                    fontSize: '1rem',
                                    fontWeight: 400,
                                    color: 'blue',
                                }}>
                                    Login
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
                                <label for="password" className="input-label" hidden>Password</label>
                                <input value={cpassword} type="password" name="password" id="password" className="input-field" placeholder="Password again"
                                    onChange={(e) => { setCpassword(e.target.value); }}
                                />
                            </div>
                            <div className="input-control submit">
                                <input onClick={register} type="submit" name="submit" className="input-submit" value="Register" />
                            </div>
                        </form>

                    </section>
                </div>
            </main>
            <ToastContainer />
        </div>
    )
}

export default Register
