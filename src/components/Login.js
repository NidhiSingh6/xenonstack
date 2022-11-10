import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from "axios";
import Config from '../Config';
import { UtilsContect } from '../elements/ContectsAPI'

export default function Login() {
    const noti = useContext(UtilsContect);
    const navigate = useNavigate();

    const [statusForm, setStatusForm] = useState("login");
    const [OTP, setOTP] = useState();
    const [enterOTP, setenterOTP] = useState();

    const [details, setDetails] =
        useState({
            email: '',
            password: ''
        });
    const [style, setStyle] = useState({ emailCSS: '', passwordCSS: '' })

    const handleForgotPassword = () => {
        setStatusForm('forgotPassword')
    }
    const handleLogIn = event => {
        Axios.post(`${Config.IP}/auth/login`, details)
            .then(function (res) {
                if (res.data === 'NE') {
                    noti.addNewMessage('User Not Exit', 'danger');
                    navigate('/register');
                } else if (res.data === 'NM') {
                    noti.addNewMessage('Password Not Match', 'danger');
                    setStyle({ emailCSS: '', passwordCSS: 'border-danger is-invalid' })
                } else if (res.data[0]) {
                    noti.addNewMessage('login successfully', 'success')
                    sessionStorage.setItem('login', true);
                    sessionStorage.setItem('role', res.data[0].role);
                    sessionStorage.setItem('email', res.data[0].email);
                    sessionStorage['myDetails'] = JSON.stringify(res.data[0]);
                    navigate('/')
                } else {
                    noti.addNewMessage('404', 'danger');
                }
            });
        event.preventDefault();
    };
    const handleEmail = (e) => {
        setStatusForm("OTP")
        Axios.post(`${Config.IP}/auth/forgetPassword`, { email: details.email })
            .then(function (res) {
                if (res.data === 'NM') {
                    noti.addNewMessage('User Not exit', 'warning');
                    navigate('/register')
                } else if (res.data.otp) {
                    setOTP(res.data.otp)
                    setStatusForm("OTP")
                }
            });
        e.preventDefault();
    }
    const handleOTP = (e) => {
        if (enterOTP == OTP) {
            setStatusForm('password')
        } else {
            noti.addNewMessage('OTP Not Match', 'danger')
        }
        e.preventDefault();
    }
    const handleResetPassword = (e) => {
        Axios.post(`${Config.IP}/auth/updatePassword`, details)
            .then(function (res) {
                noti.addNewMessage('Password updated', 'success')
            });
        setStatusForm("login")
    }

    return <div className='row justify-content-center'>
        <div className='col-md-8 col-sm-10'>
            <div className='m-3 fw-bolder display-4 text-gp-primary'>
                Log In
            </div>
            {/* login form */}
            {statusForm === 'login' &&
                <form onSubmit={handleLogIn}>
                    <div className="mb-3">
                        <input type="text" placeholder="Email address" autoFocus
                            className={`form-control form-control-lg border-gp-primary border-2 ${style.emailCSS}`}
                            value={details.email} onChange={(event) => setDetails({
                                ...details, email: event.target.value
                            })} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className={`form-control form-control-lg border-gp-primary border-2 ${style.emailCSS}`}
                            placeholder="Password" value={details.password} onChange={(event) => setDetails({
                                ...details, password: event.target.value
                            })} required />
                    </div>
                    <div className='row mb-3'>
                        <div className="col-md ms-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" for="exampleCheck1" style={{ cursor: 'pointer' }}>
                                Remember Me</label>
                        </div>
                        <div className='col-md text-end'>
                            <a style={{ cursor: 'pointer' }}
                                onClick={handleForgotPassword}>Forgot Password?</a>
                        </div>
                    </div>
                    <div className="d-grid gap-2 col-10 m-2 mx-auto ">
                        <button type="submit" className="btn btn-gp-primary-dark"
                        >Log In</button>
                    </div>
                </form>}

            {/* email form */}
            {statusForm === 'forgotPassword' &&
                <form onSubmit={handleEmail}>
                    <div className="mb-3">
                        <input type="email" placeholder="Email address"
                            className="form-control form-control-lg border-gp-primary border-2 "
                            value={details.email} onChange={(event) => setDetails({ ...details, email: event.target.value })} required />
                    </div>
                    <div className="d-grid gap-2 col-10 m-2 mx-auto ">
                        <button type="submit" className="btn btn-gp-primary-dark "
                        >Send OTP</button>
                    </div>
                </form>}
            {/* OTP form */}
            {statusForm === 'OTP' &&
                <form onSubmit={handleOTP}>
                    <div className="mb-3">
                        <input type="text" placeholder="OTP"
                            className="form-control form-control-lg border-gp-primary border-2 "
                            value={enterOTP} onChange={(event) => setenterOTP(event.target.value)} required />
                    </div>
                    <div className="d-grid gap-2 col-10 m-2 mx-auto ">
                        <button type="submit" className="btn btn-gp-primary-dark "
                        >Confirm</button>
                    </div>
                </form>}
            {/* reset password */}
            {statusForm === 'password' &&
                <form onSubmit={handleResetPassword} autocomplete="off">
                    <div className='row mb-3'>
                        <input type="password" placeholder="Password" autocomplete="new-password"
                            className="form-control form-control-lg border-gp-primary border-2"
                            value={details.password} onChange={(event) => setDetails({
                                ...details, password: event.target.value
                            })} required />
                    </div>
                    {/* <div className='row mb-3'>
                        <input type="password" placeholder="Password"
                            className="form-control form-control-lg border-gp-primary border-2 border-danger is-invalid"
                            value={details.password1} onChange={(event) => setDetails({
                                ...details, password1: event.target.value
                            })} required />
                    </div> */}
                    <div className="d-grid gap-2 col-10 m-2 mx-auto ">
                        <button type="submit" className="btn btn-gp-primary-dark "
                        >Confirm</button>
                    </div>
                </form>}
            <div className='text-center h6 m-2'>
                Don't have an account? <Link to='/register'>Register</Link>
            </div>
        </div>
    </div>
}
