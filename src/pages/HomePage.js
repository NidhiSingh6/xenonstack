import React from 'react';
import Itemcard from '../elements/Itemcard';
import data from '../components/homepage/data';



export default function HomePage() {
    return (
        <div className="mb-5">
            <div className="home_banner">
                <h1>Welcome to our Ecommerce Store!</h1>
                <p>We have the best cameras, watches and
                    shirts for you. No need to hunt around, we have all in one place.
                </p>
            </div>
            <div className="container" id="content">
                <div className="row" id="cameras">
                    <h2 className='text-gp-primary-dark m-3'>Cameras</h2>
                    {data.camerasData.map((item, index) => {
                        return (
                            <Itemcard
                                img={item.img}
                                title={item.title}
                                price={item.price}
                                item={item}
                                key={index} />
                        )
                    }
                    )}
                </div>
                <div className="row" id="watches">
                    <h2 className='text-gp-primary-dark m-3'>Watches</h2>
                    {data.watchesData.map((item, index) => {
                        return (
                            <Itemcard
                                img={item.img}
                                title={item.title}
                                price={item.price}
                                item={item}
                                key={index} />
                        )
                    }
                    )}
                </div>
                <div className="row" id="shirts">
                    <h2 className='text-gp-primary-dark m-3'>Shirts</h2>
                    {data.shirtsData.map((item, index) => {
                        return (
                            <Itemcard
                                img={item.img}
                                title={item.title}
                                price={item.price}
                                item={item}
                                key={index} />
                        )
                    }
                    )}
                </div>
            </div>

        </div>
    );
}
