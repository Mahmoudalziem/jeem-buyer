import React, { useState } from "react";
import { Link,NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector,useDispatch } from "react-redux";
import { Create } from "../common/actions";

/// Icons

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import StarIcon from "@material-ui/icons/Star";

const Product = (props) => {
  const [completedCart, setCompletedCart] = useState(props.cart ? true : false);
  const { t } = useTranslation();
  const { status, role } = useSelector((state) => state.authorization);
  const { count } = useSelector((state) => state.buyer);
  const dispatch = useDispatch();

  const addToCart = () => {
    if (role === "buyer") {
      
        Create(
          `order/${props.title.replace(/\s/g, "-").toLowerCase()}`,
          { count: 1 },
          "buyer",
          true
        ).then(res => {
          if(res){
            setCompletedCart(true);

        dispatch({
          type : "UPDATECOUNT",
          payload : {
            count : count + 1
          }
        })
          }
        })
    }
  };
  return (
    <div className="product-child">
      <NavLink to={`/product/${props.title.replace(/\s/g, "-").toLowerCase()}`}>
        <div>
          <img src={props.image} alt="" />
        </div>
        <h3>{props.title}</h3>
      </NavLink>
      <div className="details">
        <p className="price">{props.price} SAR</p>
        <p className="seller">
          <span>{t("SELLER")} : </span>
          <Link to={`/seller/${props.name.replace(/\s/g, "-").toLowerCase()}`}>
            {props.name}
          </Link>
        </p>
        {props.rate ? (
          <div className="rate">
            <StarIcon />
            <span>{props.rate.toFixed(1)}</span>
          </div>
        ) : null}

        <div className="fix"></div>
      </div>

      {status ? (
        completedCart ? (
          <button className="btn completed">
            <AddShoppingCartIcon />
            <span>{t("COMPLETED_CART")}</span>
          </button>
        ) : (
          <button className="btn" onClick={addToCart}>
            <AddShoppingCartIcon />
            <span>{t("ADD_CART")}</span>
          </button>
        )
      ) : (
        <button className="btn">
          <AddShoppingCartIcon />
          <span>{t("ADD_CART")}</span>
        </button>
      )}
    </div>
  );
};

export default Product;
