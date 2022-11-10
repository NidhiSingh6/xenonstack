import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from "react-use-cart";

const Itemcard = (props) => {
    const { addItem } = useCart();
    return (
        <div className="col-md-3 col-sm-6 home-feature text-center">
            <div className="card thumbnail_bax">
                <img className='card-img-top' src={props.img}></img>
                <div className="card-body">
                    <h4 className='card-title'>{props.title}</h4>
                    <p className='card-text'>{props.price}</p>
                    <b>Price: ₹.{props.price}</b><br/>
                    {!sessionStorage.getItem('login') ?
                        <Link className="mt-2 btn btn-gp-primary-dark btnaddtocart" to="/login">
                            Login to shop</Link>
                        :
                        <button onClick={() => addItem(props.item)} className="mt-2 btn btn-gp-primary-dark btnaddtocart">
                            Add to cart
                        </button>}
                </div>
            </div>
        </div>
    );
}
export default Itemcard;