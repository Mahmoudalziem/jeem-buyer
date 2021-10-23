import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";


const Slider = (props) => {

  return (
    <div className="long-slider">
      <Carousel>
        {props.data.map((item, key) => (
          <Carousel.Item key={key}>
              <img
                className="d-block w-100"
                src={item.image}
                alt=""
              />
              <Carousel.Caption>
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
                   <Link className="btn" to={`carousel/${item.title.replace(/\s/g , "-")}`}>Get Start</Link>
              </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
