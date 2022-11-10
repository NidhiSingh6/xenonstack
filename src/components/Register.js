import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from "axios";
import Config from '../Config';
import { UtilsContect } from '../elements/ContectsAPI'

export default function Register() {
    const noti = useContext(UtilsContect);
    const navigate = useNavigate();

    const [statusForm, setStatusForm] = useState("email");
    const [OTP, setOTP] = useState();
    const [enterOTP, setenterOTP] = useState();
    const [details, setDetails] =
        useState({
            email: '',
            firstname: '',
            lastname: '',
            dob: '',
            gender: '',
            lang: '',
            phone: '',
            password: '',
            password1: '',
            role: 0,
            image: 'https://via.placeholder.com/150',
        });
    const [style, setStyle] = useState({ otpCSS: '', passwordCSS: '' })
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (details.password !== details.password1 && details.password1 !== '') {
                setStyle({ passwordCSS: 'border-danger is-invalid' });
                noti.addNewMessage('Passwords Not Match', 'danger');
            } else {
                setStyle({ passwordCSS: '' });
            }
        }, 2000)
        return () => clearTimeout(delayDebounceFn)
    }, [details.password, details.password1])

    const handleEmail = (e) => {
        Axios.post(`${Config.IP}/auth/checkEmail`, details)
            .then((res) => {
                if (res.data === 'AE') {
                    noti.addNewMessage('User Already Exit', 'warning');
                    navigate('/login');
                } else {
                    setOTP(res.data?.otp)
                    setStatusForm("OTP")
                }
            });
        e.preventDefault();
    }
    const handleOTP = (e) => {
        if (enterOTP == OTP) {
            setStatusForm("details")
        } else {
            noti.addNewMessage('Otp Not Match', 'danger');
            setStyle({ otpCSS: 'border-danger is-invalid' });
        }
        e.preventDefault();
    }
    const handleDetails = (e) => {
        Axios.post(`${Config.IP}/auth/register`, details)
            .then((res) => {
                if (res.data === 'D') {
                    noti.addNewMessage('Successfuly Register', 'success');
                    navigate('/login')
                } else {
                    noti.addNewMessage('User Already Exit', 'warning');
                    navigate('/login')
                }
            })
        e.preventDefault();
    };

    // check box 
    const [agreeBtn, setAgreeBtn] = useState(true);
    const handleOnChange = () => {
        agreeBtn ? (setAgreeBtn(false)) : (setAgreeBtn(true));
    }
    return <div className='row justify-content-center'>
        <div className='col-md-8 col-sm-10'>
            <div className='m-3 fw-bolder display-4 text-gp-primary'>
                Register
            </div>
            {statusForm === 'email' &&
                // {/* email form */}
                <form method='POST' onSubmit={handleEmail}>
                    <div className="mb-3">
                        <input type="email" placeholder="Email address"
                            className="form-control form-control-lg border-gp-primary border-2 "
                            value={details.email} onChange={(event) => setDetails({
                                ...details, email: event.target.value
                            })} required />
                    </div>
                    <div className='row mb-3'>
                        <div className="col ms-3 form-check">
                            <input type="checkbox" className="form-check-input border-gp-primary"
                                id="exampleCheck1" onChange={handleOnChange} />
                            <label className="form-check-label" for="exampleCheck1" style={{ cursor: 'pointer' }}>
                                Agree to our Terms and Conditions</label>
                        </div>
                    </div>
                    <div className="d-grid gap-2 col-10 m-2 mx-auto ">
                        <button type="submit" className="btn btn-gp-primary-dark " disabled={agreeBtn}
                        >Send OTP</button>
                    </div>
                </form>}
            {statusForm === 'OTP' &&
                // {/* OTP form */}
                <form method='POST' onSubmit={handleOTP}>
                    <div className="mb-3">
                        <input type="text" placeholder="OTP"
                            className={`form-control form-control-lg border-gp-primary border-2 ${style.otpCSS}`}
                            value={enterOTP} onChange={(event) => setenterOTP(event.target.value)} required />
                    </div>
                    <div className="d-grid gap-2 col-10 m-2 mx-auto ">
                        <button type="submit" className="btn btn-gp-primary-dark "
                        >Confirm</button>
                    </div>
                </form>}
            {statusForm === 'details' &&
                // {/* details form */}
                <form method='POST' onSubmit={handleDetails} autocomplete="off">
                    <div className="row mb-3">
                        <div className="col">
                            <input type="text" placeholder="First Name" autoFocus
                                className="form-control form-control-lg border-gp-primary border-2 "
                                value={details.firstname} onChange={(event) => setDetails({
                                    ...details, firstname: event.target.value
                                })} required />
                        </div>
                        <div className="col">
                            <input type="text" placeholder="Last Name"
                                className="form-control form-control-lg border-gp-primary border-2 "
                                value={details.lastname} onChange={(event) => setDetails({
                                    ...details, lastname: event.target.value
                                })} required />
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <input type="tel" pattern="[5-9]{1}[0-9]{9}" placeholder="Phone" autocomplete="off"
                            className="form-control form-control-lg border-gp-primary border-2"
                            value={details.phone} onChange={(event) => setDetails({
                                ...details, phone: event.target.value
                            })} required />
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <input type="password" placeholder="Password" autocomplete="new-password"
                                className="form-control form-control-lg border-gp-primary border-2 "
                                value={details.password} onChange={(event) => setDetails({
                                    ...details, password: event.target.value
                                })} required />
                        </div>
                        <div className="col">
                            <input type="password" placeholder="Password"
                                className={`form-control form-control-lg border-gp-primary border-2 ${style.passwordCSS}`}
                                value={details.password1} onChange={(event) => setDetails({
                                    ...details, password1: event.target.value
                                })} required />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <input type="date" placeholder="Date of Birth"
                                className="form-control form-control-lg border-gp-primary border-2 "
                                value={details.dob} onChange={(event) => setDetails({
                                    ...details, dob: event.target.value
                                })} required />
                        </div>
                        <div className="col">
                            <select class="form-select form-control form-control-lg border-gp-primary border-2">
                                <option selected>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="d-grid gap-2 col-10 m-2 mx-auto ">
                        <button type="submit" className="btn btn-gp-primary-dark "
                        >Register</button>
                    </div>
                </form>
            }
            <div className='text-center h6 m-2'>
                Already have a account? <Link to='/login'>Log In</Link>
            </div>
        </div>
    </div>
}