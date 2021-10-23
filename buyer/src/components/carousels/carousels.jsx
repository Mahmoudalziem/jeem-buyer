import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../layouts/spinner/spinner";
import { Fetch } from "../common/actions";
import { Empty } from "antd";
import Product from "../products/product";

const Carousels = () => {
  const [products, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    Fetch(`carousel/${params.name}`, "buyer").then((res) => {
      if (res.status) {
        setProduct(res.data);
        setLoading(true);
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="products-container">
        <div className="container">
        <div className="row">
          {products.length > 0 ? (
            products.map((item, index) => (
              <div className="col-md-6 col-lg-3 col-12" key={index}>
                <Product
                  price={item.price}
                  name={item.seller.name}
                  title={item.title}
                  rate={item.rate}
                  id={item.id}
                  cart={item.cart}
                  image={item.images[0]}
                />
              </div>
            ))
          ) : (
            <Empty className="w-100 p-5" description="Not Found Products" />
          )}
        </div>
        </div>
      </div>
    );
  } else {
    return <Spinner width="100%" height="100vh" />;
  }
};

export default Carousels;
