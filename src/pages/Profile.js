import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Config from '../Config';
import Axios from "axios";
import { UtilsContect } from '../elements/ContectsAPI'

export default function Profile() {
    const noti = useContext(UtilsContect);
    const navigate = useNavigate();

    const [details, setDetails] = useState(JSON.parse(sessionStorage.getItem('myDetails')) || {});



    const handleDetails = (e) => {
        Axios.post(`${Config.IP}/auth/profile`, details)
            .then((res) => {
                sessionStorage.removeItem("myDetails");
                sessionStorage['myDetails'] = JSON.stringify(res.data[0]);
            }).then(() => {
                noti.addNewMessage('Profile updated successfully', 'success')
                navigate('/')
            })
        e.preventDefault();
    };
    return <div className='row align-items-center justify-content-center m-0'>

        <div className='col-md-10 mt-5'>
            <form method='POST' onSubmit={handleDetails}>
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label ms-3 mb-0 fw-bold text-gp-primary-dark">First Name</label>
                        <input type="text" placeholder="First Name" autoFocus
                            className="form-control form-control-lg border-gp-primary border-2 rounded-pill "
                            value={details.firstname} onChange={(event) => setDetails({
                                ...details, firstname: event.target.value
                            })} required />
                    </div>
                    <div className="col">
                        <label className="form-label ms-3 mb-0 fw-bold text-gp-primary-dark">Last Name</label>
                        <input type="text" placeholder="Last Name"
                            className="form-control form-control-lg border-gp-primary border-2 rounded-pill "
                            value={details.lastname} onChange={(event) => setDetails({
                                ...details, lastname: event.target.value
                            })} required />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label ms-3 mb-0 fw-bold text-gp-primary-light">Can't Change</label>
                        <input type="email" placeholder="Email address"
                            className="form-control form-control-lg border-gp-primary border-2 rounded-pill "
                            value={details.email} onChange={(event) => setDetails({
                                ...details, email: event.target.value
                            })} required disabled />
                    </div>
                    <div className="col">
                        <label className="form-label ms-3 mb-0 fw-bold text-gp-primary-dark">Phone Number</label>
                        <input type="tel" pattern="[5-9]{1}[0-9]{9}" placeholder="Phone Number"
                            className="form-control form-control-lg border-gp-primary border-2 rounded-pill"
                            value={details.phone} onChange={(event) => setDetails({
                                ...details, phone: event.target.value
                            })} required />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <input type="password" placeholder="Password"
                            className="form-control form-control-lg border-gp-primary border-2 rounded-pill "
                            value={details.password} onChange={(event) => setDetails({
                                ...details, password: event.target.value
                            })} required />
                    </div>
                    <div className="col">
                        <input type="date" placeholder="Date of Birth"
                            className="form-control form-control-lg border-gp-primary border-2 rounded-pill"
                            value={details.dob} onChange={(event) => setDetails({
                                ...details, dob: event.target.value
                            })} required />
                    </div>
                </div>
                <div className="d-grid gap-2 col-4 m-2 mx-auto ">
                    <button type="submit" className="btn btn-gp-primary-dark rounded-pill "
                    >Save Change</button>
                </div>
            </form>
        </div>
    </div>
}
