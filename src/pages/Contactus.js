import React from 'react';
import Contactform from '../elements/Contactform';
import Config from '../Config';

export default function Contactus() {
    return (<>
        {/* Services Enquiry */}
        <div className='row justify-content-center mx-3'>
            <div className='col-md-8 col-sm-10 mt-5 px-5 py-3 gp-box'>
                <div className='h1 fw-bolder text-gp-primary-dark'>
                    Services Enquiry
                </div>
                <div className='my-3 text-dark'>
                    Feel free to reach out to us if you have a query related to any
                    Service that we offer.
                </div>
                <Contactform for='Services Enquiry' />
            </div>
        </div>
        {/* Corporate Enquiry */}
        <div className='row justify-content-center mx-3'>
            <div className='col-md-8 col-sm-10 mt-5 px-5 py-3 gp-box' >
                <div className='h1 fw-bolder text-gp-primary-dark'>
                    Corporate Enquiry
                </div>
                <div className=' my-3 text-dark'>
                    For any Corporate requirement please reach out to
                    us on <a href={`tel:${Config.phone} `}>{` ${Config.phone} `}</a>Darius via call or Whatsapp or you can also send a mail to
                    <a href={`mailto:${Config.email} `}>{` ${Config.email} `}</a>We will definitely get back to you.
                </div>
                {/* Corporate Enquiry */}
                <Contactform for='Corporate Enquiry' />
            </div>
        </div>

        {/* Visit Us */}
        <div className='row justify-content-center align-items-center mx-0 px-5 text-center'>
            <div className='col-lg-6 col-md-8 '>
                <div className='h1 text-gp-primary-dark pb-3 mt-5 border-bottom border-5 border-gp-primary-dark'>
                    Contact Details</div>
                <div className='row p-3'>
                    <div className='col-10'>
                        <div className='h6'>
                            <a href={Config.addressLink}>
                                {` ${Config.address} `}
                            </a></div>
                    </div>
                </div>
                <div className='row px-3 '>
                    <div className='col-10'>
                        <div className='h6'><a href={`tel:${Config.phone} `}>{` ${Config.phone} `}</a></div>
                    </div>
                </div>
                <div className='row p-3'>
                    <div className='col-10'>
                        <div className='h6'><a href={`mailto:${Config.email} `}>{` ${Config.email} `}</a></div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
