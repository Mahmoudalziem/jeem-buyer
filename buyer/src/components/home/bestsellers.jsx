import React from "react";
import { useTranslation } from "react-i18next";

import Product from '../products/product'

/// Images

const Products = (props) => {

  const { t } = useTranslation("translations");

  return (
    <div className="best-buy">
      <div className="section_header">
        <span>{t("BEST_BUY")}</span>
      </div>
      <div className="products">
          <div className="container">
            <div className="row">
              {
                props.data.map((item,key) => (
                  <div className="col-lg-3 col-md-6 col-12" key={key}>
                    <Product price={item.price} name={item.seller.name} title={item.title} rate={item.rate} id={item.id} image={item.images[0]} cart={item.cart}/>
                  </div>
                ))
              }
            </div>
          </div>
      </div>
    </div>
  );
  
  // if (loading) {
  //   return (
  //     <div className="best-buy">
  //       <h1>{t("BEST_BUY")}</h1>
  //       <div className="products">
  //           <Product />
  //           <Product />
  //           <Product />
  //           <Product />
  //       </div>
  //     </div>
  //   );
  // } else {
  //   return <Spinner />;
  // }
};

export default Products;
