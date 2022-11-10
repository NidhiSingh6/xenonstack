import React, { createContext, useState } from 'react';

import logo from '../assets/logo.png'
import * as bootstrap from "bootstrap";


const UtilsContect = createContext();

const ContectsAPI = (props) => {
    const [toastDetails, setToastDetails] = useState(
        { message: null, type: null, time: null }
    );

    const addNewMessage = (mess, type) => {
        // set time
        const d = new Date();
        let timing = d.getHours() + ":" + d.getMinutes();
        setToastDetails({ message: mess, type: type, time: timing })
    }

    var option = {
        animation: true,
        autohide: true,
        delay: 8000,
    };
    // add toast
    function toastAdd() {
        var toastLive = document.querySelectorAll('#liveToast');
        toastLive.forEach(function (value, index) {
            var toast = new bootstrap.Toast(toastLive[index], option);
            toast.show();
        })
    }


    const handleRemove = () => {
        setToastDetails(
            { message: null, type: null, time: null }
        )
    }

    setTimeout(toastAdd, 300);

    return (
        <UtilsContect.Provider value={{ toastDetails, addNewMessage }}>
            {props.children}

            <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: '2000' }}>
                {toastDetails.message &&
                    <div id="liveToast" className={`gp-bg toast my-1 border-5 border-${toastDetails.type} border-end-0 border-top-0 border-bottom-0`}
                        role="alert" aria-live="assertive" aria-atomic="true" style={{ width: '250px' }}>
                        <div className="toast-header pb-1">
                            <img src={logo} className="rounded" alt="logo" style={{ height: '20px' }} />
                            <small className="ms-auto">{toastDetails.time}</small>
                            <button type="button" onClick={handleRemove} className="btn-close text-end"
                                data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div className={`toast-body bg-white pt-1 fw-semibold text-${toastDetails.type}`}>
                            {toastDetails.message}</div>
                    </div>}
            </div>
        </UtilsContect.Provider>
    )
}
export { UtilsContect, ContectsAPI };