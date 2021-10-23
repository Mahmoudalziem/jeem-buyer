import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Spinner from "../layouts/spinner/spinner";
import { Fetch, Delete, Create } from "../../common/actions";
import { Rate, Tooltip, Button, Empty } from "antd";
import { useDispatch } from "react-redux";

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const Orders = () => {
  const { t } = useTranslation();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [cart, setCart] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    Fetch("wishlist", "buyer").then((res) => {
      if (res.status) {
        setData(res.data);
        setLoading(true);
      } else {
        setData();
        setLoading(true);
      }
    });
  }, []);

  const cancelWishlist = (index) => {
    Delete("wishlist", index, "buyer").then((res) => {
      if (res) {
        const newData = [...data];

        const item = newData.find(({ id }) => id === index);

        newData.splice(item, 1);

        setData(newData);
      }
    });
  };

  const createOrder = (product) => {
    Create(
      `order/${product.replace(/\s/g, "-").toLowerCase()}`,
      { count: 1 },
      "buyer"
    ).then((res) => {
      if (res.status) {
        setCart(true);
        dispatch({
          type: "UPDATECOUNT",
          payload: {
            count: count + 1,
          },
        });
      }
    });
  };

  if (loading) {
    return (
      <div className="container">
        <div className="row">
          {data.length > 0 ? (
            data.map((item, key) => (
              <div className="col-md-6 col-12" key={key}>
                <div className="order">
                  <div className="order-img">
                    <img src={item.images[0]} alt="" />
                  </div>
                  <div className="order-info order-wishlist">
                    <h4>
                      <a
                        href={`/product/${item.title
                          .replace(/\s/g, "-")
                          .toLowerCase()}`}
                      >
                        {item.title}
                      </a>
                    </h4>
                    <p className="sold-by sold-wishlist">
                      <span>{t("SOLD_BY")}: </span>
                      <a
                        href={`/seller/${item.seller.name
                          .replace(/\s/g, "-")
                          .toLowerCase()}`}
                      >
                        {item.seller.name}
                      </a>
                    </p>
                    <p>
                      <Rate disabled defaultValue={item.rate} />
                    </p>
                  </div>
                  <div className="order-footer">
                    <div className="button-wishlist">
                      <Tooltip title={t("CANCEL_WISHLIST")}>
                        <FavoriteBorderIcon
                          onClick={() => cancelWishlist(item.id)}
                        />
                      </Tooltip>
                    </div>
                    {item.cart || cart ? (
                      <Button className="action button-wishlist btn completed">
                        <AddShoppingCartIcon />
                        <span>{t("COMPLETED_CART")}</span>
                      </Button>
                    ) : (
                      <Button
                        className="action button-wishlist btn"
                        onClick={() => createOrder(item.title)}
                      >
                        <AddShoppingCartIcon />
                        <span>{t("ADD_CART")}</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 p-5">
              <Empty description="Not Found Wishlist" />
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <Spinner width="100%" height="100vh" />;
  }
};

export default Orders;
