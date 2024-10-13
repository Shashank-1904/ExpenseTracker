import React, { useState } from 'react';
import formimg1 from './../assets/images/signup.png';
import logo from './../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

const Login = () => {

    const [loginInfo, setLoginInfo] = useState({
        uemail : '',
        upass : ''

    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        const copyLoginInfo = {...loginInfo};
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const {uemail, upass} = loginInfo;
        if(!uemail || !upass)
        {
            return handleError("All Fields are Required")
        }

        try{
            const url = "https://expense-tracker-api-sandy.vercel.app/auth/login";
            const response = await fetch(url, {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify(loginInfo)
            });

            const result = await response.json();

            const {success, message, error, jwtToken, uname} = result;
            if(success)
            {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', uname);
                setTimeout(() => {
                    navigate('/home')
                }, 1000)
            }
            else if(error)
            {
                const details = error?.details[0].message;
                handleError(details);
            }
            else if(!success)
            {
                handleError(message);
            }
            console.log(result);
        }
        catch(err) {
            handleError(err);
        }
    }

    console.log(loginInfo);

    return (
        <section className="vh-100" style={{ backgroundColor: '#eee' }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: '25px' }}>
                            <div className="card-body">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <img
                                            src={logo} // Displaying the logo
                                            alt="Logo"
                                            className="img-fluid mb-4 mx-auto" // Ensuring it's responsive
                                            style={{ maxWidth: '250px' }} // Set a maximum width for the logo
                                        />
                                        <h1 className="text-center fw-bold mb-5 mx-1 mx-md-4 mt-1">Login</h1>
                                        <form className="mx-1 mx-md-4" onSubmit={handleLogin}>
                                            <div className="d-flex flex-row align-items-center mt-3">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="email">Email</label>
                                                    <input 
                                                        onChange={handleChange}
                                                        type="email" 
                                                        name="uemail" 
                                                        id="uemail" 
                                                        className="form-control" 
                                                        placeholder='Enter Your Email' 
                                                        value={loginInfo.uemail}
                                                    />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mt-3">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="password">Password</label>
                                                    <input 
                                                        onChange={handleChange}
                                                        type="password" 
                                                        name="upass" 
                                                        id="upass" 
                                                        className="form-control" 
                                                        placeholder='Enter Your Password' 
                                                        value={loginInfo.upass}
                                                    />
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mt-3 mb-lg-4">
                                                <button type="submit" className="btn btn-primary">Login</button>
                                            </div>

                                            <div className="form-check d-flex justify-content-center mt-1">
                                                <label className="form-check-label" htmlFor="form2Example3">
                                                Don't Have an Account ? <Link to='/signup'>Register</Link>
                                                </label>
                                            </div>
                                        </form>
                                        <ToastContainer />
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img
                                            src={formimg1}
                                            className="img-fluid"
                                            alt="Sample image"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
