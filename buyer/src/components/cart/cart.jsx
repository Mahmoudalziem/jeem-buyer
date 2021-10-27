import React, { useState, useEffect, Fragment } from "react";
import { Fetch } from "../common/actions";
import Spinner from "../layouts/spinner/spinner";
import { useTranslation } from "react-i18next";
import { Button, Empty, Radio } from "antd";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { Update, Create,Delete } from "../common/actions";
import { NewAddress } from "./model";

//icons

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import CancelIcon from "@material-ui/icons/Cancel";

const Cart = (props) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [addressInfo, setAddressInfo] = useState([]);
  const [newAddress, setNewAddress] = useState();
  const [totalPrice,setTotalPrice] = useState(0);
  const [countOrder, setCountOrder] = useState(1);
  const [visibleAddress, setVisibleAddress] = useState(false);
  const { count } = useSelector((state) => state.buyer);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { name } = useSelector((s) => s.buyer);

  const addOrder = (index) => {

    let exit_address = addressInfo.find(({address}) => address === newAddress)

    if(exit_address){

      Update(`order`, {address : exit_address.id}, `${index}/status`, "buyer").then((res) => {

        const newData = [...cart];

  
        const item = newData.find(({ code }) => code === index);
  
        newData.splice(item, 1);

  
        setCart(newData);


        dispatch({
          type : "UPDATECOUNT",
          payload : {
            count : count - 1
          }
        })

      });

    }
  };

  const cancelOrder = (index) => {

    Update(`order`, null, `${index}/cancel`, "buyer").then((res) => {

      const newData = [...cart];

      const item = newData.find(({ code }) => code === index);

      newData.splice(item, 1);

      setCart(newData);

      setTotalPrice(totalPrice - item.price);
      
      dispatch({
          type : "UPDATECOUNT",
          payload : {
            count : count - 1
          }
        })
    });
  };



  useEffect(() => {

    Fetch("cart", "buyer").then((res) => {
      if (res.status) {
        setCart(res.data.orders);
        let newProducts = [];

        let newPrice = [];

        setTotalPrice(res.data.totalPrice);

        res.data.orders.forEach((item) => {
          newProducts.push({
            code: item.code,
            title: item.product.title,
          });
          newPrice.push({
            code: item.code,
            price: item.price,
          });
        });

        setProducts(newProducts);

        setLoading(true);
      }
    });

    Fetch("address", "buyer").then((res) => {
      if (res.status) {
        setAddressInfo(res.data);
      }
    });

  }, []);

  const setNewAddressInfo = (values) => {

    let newData = [...addressInfo];

    Create("address", values, "buyer").then((res) => {

      if (res.status) {

        values.status = false;

        values.id = res.data.id;

        newData.push(values);

        setAddressInfo(newData);
      }
    });
  };

  const deleteAddress = (index) => {

    Delete('address',index,'buyer').then(res => {

      if(res){

        const newData = [...addressInfo];

        newData.splice(index, 1);

        setAddressInfo(newData);

        setNewAddress();
      }

    })
  }

  const getAddress = (event) => {
    
    let item = addressInfo[event.target.value];

    setNewAddress(item.address);
  };

  const submitCart = () => {

    let codeContent = {
      products : [],
      address : ''
    };

    cart.map(item => codeContent.products.push(item.code))

    let exit_address = addressInfo.find(({address}) => address === newAddress)

    if(exit_address){

      codeContent.address = exit_address.id;

      Update('orders', codeContent, 'status', "buyer").then(res => {

        setCart([]);

      })
    }
  }
  if (loading) {
    return (
      <div className="category">
        <div className="category-header">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">{t("HOME")}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{t("MY_CART")}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="cart-container">
          <div className="container-fluid">
            <div className="row">
              {cart.length > 0 ? (
                <Fragment>
                  <div className="col-md-6 col-12">
                    <div className="orders-container">
                      <div className="row">
                        {cart.map((item, key) => (
                          <div className="col-12" key={key}>
                            <div className="order">
                              <div className="order-img">
                                <img src={item.images[0]} alt="" />
                              </div>
                              <div className="order-info">
                                <h4>
                                  <Link
                                    to={`/product/${item.product.title
                                      .replace(/\s/g, "-")
                                      .toLowerCase()}`}
                                  >
                                    {item.product.title}
                                  </Link>
                                </h4>
                                <p className="date">
                                  {new Date(item.created_at).getFullYear()}
                                </p>
                                <p className="sold-by">
                                  <span>{t("SOLD_BY")} : </span>
                                  <Link
                                    to={`/seller/${item.seller.name
                                      .replace(/\s/g, "-")
                                      .toLowerCase()}`}
                                  >
                                    {item.seller.name}
                                  </Link>
                                </p>
                              </div>
                              <div className="order-buttons">
                                <div className="quantity-container">
                                  <AddCircleOutlineIcon
                                    onClick={() => setCountOrder(countOrder + 1)}
                                  />
                                  <p className="quantity">
                                    {countOrder > item.counts ? countOrder : item.counts}
                                  </p>
                                  <RemoveCircleOutlineIcon
                                    onClick={() =>
                                      setCountOrder(countOrder ? 1 : countOrder - 1)
                                    }
                                  />
                                </div>
                                <Button
                                  className="action reorder btn d-block"
                                  onClick={() => addOrder(item.code)}
                                >
                                  {t("ALLOE_ORDER")}
                                </Button>
                                <Button
                                  className="action cancel btn"
                                  onClick={() => cancelOrder(item.code)}
                                >
                                  {t("CANCEL_ORDER")}
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-12">
                    <div className="checkout">
                      <div className="checkout-box">
                        <h2>{t("ITEMS")}</h2>
                        <p className="products">
                          {products.map((item, key) => (
                            <span key={key}>{item.title}</span>
                          ))}
                        </p>
                        <div className="addresses">
                          <div className="address-content">
                            <div className="container">
                              <Radio.Group onChange={getAddress}>
                                {addressInfo.map((item, index) => (
                                  <div
                                    className="address-container"
                                    key={index}
                                  >
                                    <Radio id="address-content" value={index}>
                                      <div className="address-header">
                                        <p htmlFor="address-content">
                                          {t("BILLING_ADDRESS")}
                                        </p>
                                        {!item.status ? (
                                          <p className="delete-address" onClick={() => deleteAddress(index)}>
                                            <CancelIcon />
                                          </p>
                                        ) : null}
                                      </div>
                                      <div className="address-body">
                                        <p className="name">
                                          <AccountCircleIcon />
                                          <span>{name}</span>
                                        </p>
                                        <p className="address">
                                          <LocationOnIcon />
                                          <span>{item.address}</span>
                                        </p>
                                        <p className="phone-number">
                                          <PhoneIcon />
                                          <span>+{item.phone}</span>
                                        </p>
                                      </div>
                                    </Radio>
                                  </div>
                                ))}
                              </Radio.Group>
                            </div>
                          </div>
                        </div>
                        <div
                          className="link"
                          onClick={() => setVisibleAddress(true)}
                        >
                          {t("ADD_NEW_ADDRESS")}
                        </div>

                        <NewAddress
                          visible={visibleAddress}
                          onCancel={() => setVisibleAddress(false)}
                          newData={(event) => setNewAddressInfo(event)}
                          title={t('ADDRESS')}
                          // handlingProps={() =>
                          //   handlingEditMeetingProps(rowIndex.rowIndex)
                          // }
                        />

                        <p className="checkout-footer">
                          {t("SHIPPING_TO")}:{" "}
                          <span className="light-brown">{newAddress}</span>
                        </p>
                        <p className="checkout-footer">
                          {t("ORDER_COST")}:{" "}
                          <span className="light-brown">
                          {totalPrice}
                            .00 SAR
                          </span>
                        </p>
                        {/* <p className="checkout-footer">
                          {t("SHIPPING_COST")}:{" "}
                          <span className="light-brown">
                            <span className="shipping-price">60.00</span> SAR
                          </span>
                        </p> */}

                        <h2 className="total">
                          {t("TOTAL")}:{" "}
                          <span className="light-brown">
                            {totalPrice}
                            .00 SAR
                          </span>
                        </h2>
                        <button className="checkout-btn" onClick={submitCart}>
                          {t("CHECKOUT")}
                        </button>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ) : (
                <div className="col-12 p-5">
                  <Empty description="Not Found Orders" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Spinner width="100%" height="100vh" />;
  }
};

export default Cart;
