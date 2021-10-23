import React, { useState, useEffect } from "react";
import { Button, Empty } from "antd";
import{Link} from 'react-router-dom'
import Spinner from "../layouts/spinner/spinner";
import { useTranslation } from "react-i18next";
import { Fetch, Update } from "../../common/actions";

const Orders = () => {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();

  const cancelOrder = (index) => {
    Update("order", null, `${index}/cancel`, "buyer", true).then((res) => {
      if (res.status) {
        const newData = [...orders];

        const item = newData.find(({ code }) => code === index);

        newData.splice(item, 1);

        setOrders(newData);
      }
    });
  };

  useEffect(() => {
    Fetch("orders", "buyer").then((res) => {
      if (res.status) {
        setOrders(res.data);
        setLoading(true);
      } else {
        setOrders();
        setLoading(true);
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="row">
          {orders.length > 0 ? (
            orders.map((item, key) => (
              <div className="col-md-6 col-12" key={key}>
                <div className="order">
                  <div className="order-img">
                    <img src={item.images[0]} alt="" />
                  </div>
                  <div className="order-info">
                    <h4>
                      <a
                        href={`/product/${item.product.title
                          .replace(/\s/g, "-")
                          .toLowerCase()}`}
                      >
                        {item.product.title}
                      </a>
                    </h4>
                    <p className="date">
                      {`${new Date(item.created_at).getFullYear()}/${new Date(item.created_at).getMonth()}/${new Date(item.created_at).getDay()}`}
                    </p>
                    <p className="date">
                      {item.code}
                    </p>
                    <p className="state completed">
                      {i18n.language === "ar"
                        ? item.delivery.name_ar
                        : item.delivery.name_en}
                    </p>
                    <p className="sold-by">
                      <span>{t("SOLD_BY")}: </span>
                    </p>
                  </div>
                  <div className="order-footer">
                    {item.delivery.id === 7 ? (
                      <Button
                        className="action reorder btn"
                        onClick={() => cancelOrder(item.code)}
                      >
                        {t("CANCEL_ORDER")}
                      </Button>
                    ) : item.delivery.id === 2 ? (
                      <Link className="action reorder btn" to={`/profile/invoice/${item.code}`}>
                        {t("Invoice")}
                      </Link>
                    ) : null}

                    <a
                      href={`/seller/${item.seller.name
                        .replace(/\s/g, "-")
                        .toLowerCase()}`}
                    >
                      {item.seller.name}
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 p-5">
              <Empty description="Not Found Orders" />
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
