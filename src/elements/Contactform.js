import React, { useState, useContext } from 'react';
import Axios from "axios";
import Config from '../Config';
import { UtilsContect } from './ContectsAPI'

export default function Contactform(props) {
    const noti = useContext(UtilsContect);

    const [formData, setFormData] =
        useState({
            for: props.for,
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            message: ''
        })



    const handleMessage = (event) => {
        Axios.post(`${Config.IP}/contactus`, formData)
            .then((res) => {
                if (res.data === 'D') {
                    noti.addNewMessage('Got your message', 'success');
                    setFormData({})
                } else {
                    noti.addNewMessage('Something went wrong', 'danger');
                }
            });
        event.preventDefault();
    }
    return (
        <>
            <form onSubmit={handleMessage}>
                <div className="row">
                    <div className="col-md m-2">
                        <input type="text" placeholder="First name" aria-label="First name"
                            className="form-control border-gp-primary-dark border-2 border-0 border-bottom"
                            value={formData.firstname} onChange={(event) => setFormData({
                                ...formData, firstname: event.target.value
                            })} required />
                    </div>
                    <div className="col-md m-2">
                        <input type="text" placeholder="Last name" aria-label="Last name"
                            className="form-control border-gp-primary-dark border-2 border-0 border-bottom"
                            value={formData.lastname} onChange={(event) => setFormData({
                                ...formData, lastname: event.target.value
                            })} required />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md m-2">
                        <input type="email" placeholder="Email" aria-label="Email"
                            className="form-control border-gp-primary-dark border-2 border-0 border-bottom"
                            value={formData.email} onChange={(event) => setFormData({
                                ...formData, email: event.target.value
                            })} required />
                    </div>
                    <div className="col-md m-2">
                        <input type="tel" pattern="[5-9]{1}[0-9]{9}" placeholder="Phone" aria-label="Phone"
                            className="form-control border-gp-primary-dark border-2 border-0 border-bottom"
                            value={formData.phone} onChange={(event) => setFormData({
                                ...formData, phone: event.target.value
                            })} required />
                    </div>
                </div>
                <div className='row'>
                    <div class="col-md m-2">
                        <textarea class="form-control border-gp-primary-dark border-2 border-0 border-bottom"
                            value={formData.message} onChange={(event) => setFormData({
                                ...formData, message: event.target.value
                            })} required
                            placeholder="Message...." rows="2">
                        </textarea>
                    </div>
                </div>
                <button type="submit" class="m-4 px-5 btn btn-gp-primary-dark ">Send Message</button>
            </form>
        </>
    );
}
