import React from 'react'
import {Link} from 'react-router-dom'

const Carousel = (props) => {
    return (
        <div className="carousel-body">
            <div className="body-container">
                <div className="carousel-body-left">
                        Buy AnyThing With <span>Jeem Comany</span>
                </div>
                <Link  to="/products" className="btn">Get Start</Link>
            </div>
        </div>
    );
};

export default Carousel;
