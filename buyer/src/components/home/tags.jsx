import React from "react";
import Slider from "react-slick";
import Product from "../products/product";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Tags = (props) => {

  const settings = {
    dots: false,
    infinite: true,
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="best-buy">
      <div className="section_header">
        <span>{props.data.title}</span>
      </div>
      <div className="products">
        <div className="container">
          <Slider {...settings}>
            {props.data.products.map((item, key) => (
              <div key={key}>
                <Product
                  price={item.price}
                  name={item.seller.name}
                  title={item.title}
                  rate={item.rate}
                  id={item.id}
                  image={item.images[0]}
                  cart={item.cart}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Tags;
