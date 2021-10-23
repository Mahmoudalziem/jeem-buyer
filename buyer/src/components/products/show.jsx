import React, { Fragment, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Spinner from "../layouts/spinner/spinner";
import { useParams,Link } from "react-router-dom";
import {  Button } from "antd";
import { withRouter } from "react-router";
import { Breadcrumb } from "antd";
import ImageGallery from "react-image-gallery";
import { useSelector,useDispatch } from "react-redux";
import Review from "./review";
import { Rate, Tooltip } from "antd";
import Product from "./product";
import { Fetch, Create } from "../common/actions";
import { MakeReview, MakeNegotiate } from "./model";
//////icons

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";

const Show = (props) => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleNegotiate, setVisibleNegotiate] = useState(false);
  const [cart, setCart] = useState(false);
  const [completedWishlist, setCompletedWishlist] = useState(false);
  const [count, setCount] = useState(1);

  const { t } = useTranslation();

  const params = useParams();

  const dispatch = useDispatch();
  
  const { status, role } = useSelector((state) => state.authorization);

  const makeWishlist = () => {
    Create(`wishlist/${params.product}`, null, "buyer",true).then(res => {
      if(res.status){
        setCompletedWishlist(true);
      }
    })
  };

  const createOrder = () => {
    Create(`order/${params.product}`, { count: count }, "buyer",true).then((res) => {
      if (res) {
        setCart(true);
        dispatch({
          type : "UPDATECOUNT",
          payload : {
            count : count + 1
          }
        })
      }
    });
  };

  useEffect(() => {
    Fetch(`product/${params.product}`, "buyer").then((res) => {
      if (res.status) {
        setProduct(res.data);
        setLoading(true);
        setCompletedWishlist(res.data.wishlist);
        // setCount(res.data.count);
        setCart(res.data.cart)
      }
    });
  }, [params.product]);

  if (loading) {
    return (
      <Fragment>
        <div className="category">
          <div className="category-header">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/">{t("HOME")}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/products">{t("PRODUCTS")}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{t("PRODUCT")}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="content-container">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-12">
                <div className="images">
                  <section className="section" aria-labelledby="product-images">
                    <div className="carousel-container">
                      <ImageGallery items={product.images} />
                    </div>
                  </section>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 col-12">
                <div className="info">
                  <h1 className="title">{product.title}</h1>
                  <p className="seller">
                    <span>{t("SELLER")} :</span>
                    <Link
                      to={`/seller/${product.seller.name
                        .replace(/\s/g, "-")
                        .toLowerCase()}`}
                    >
                      {product.seller.name}
                    </Link>
                  </p>
                  <div className="stars">
                    <div className="row align-items-center">
                      <div className="col-md-6 col-12">
                        <Rate
                          disabled
                          defaultValue={
                            product.rate ? product.rate.toFixed(1) : 0
                          }
                        />
                      </div>
                      <div className="col-md-6 col-12">
                        {status && role === "buyer" ? (
                          product.allow_rate ? (
                            <Button
                              className="btn"
                              onClick={() => setVisible(true)}
                            >
                              {t("RATE")}
                            </Button>
                          ) : null
                        ) : (
                          false
                        )}
                      </div>
                    </div>
                  </div>
                  <MakeReview
                    title={t('MAKE_REVIEW')}
                    dataIndex={product.id}
                    visible={visible}
                    onCancel={() => setVisible(false)}
                    handlingProps={() => setVisible(false)}
                  />
                  <h2 className="descripton-title">
                    {t("PRODUCT_DESCRIPTION")}
                  </h2>
                  <p className="description">{product.descri}</p>
                  <h2 className="descripton-title">{t("PRICE")}</h2>
                  <div className="price_count">
                    <div className="row align-items-center text-center">
                      <div className="col-md-4 col-12">
                        <p className="price">{product.price} SAR</p>
                      </div>
                      <div className="col-md-5 col-12">
                        <div className="quantity-container">
                          <AddCircleOutlineIcon
                            onClick={() => setCount(count + 1)}
                          />
                          <p className="quantity">{count}</p>
                          <RemoveCircleOutlineIcon
                            onClick={() => setCount(count === 1 ? 1 : count - 1)}
                          />
                        </div>
                      </div>
                      <div className="col-md-3 col-12">
                        <div className="wishlist">
                          {status ? (
                            role === "buyer" ? (
                              completedWishlist ? (
                                <Tooltip title={t("COMPLETED_CART")}>
                                    <FavoriteIcon className="active" />
                                </Tooltip>
                              ) : (
                                <Tooltip title={t("ADD_WISHLIST")}>
                                  <FavoriteIcon onClick={makeWishlist} />
                                </Tooltip>
                              )
                            ) : (
                              <Tooltip title={t("ADD_WISHLIST")}>
                                <FavoriteIcon />
                              </Tooltip>
                            )
                          ) : (
                            <Tooltip title={t("ADD_WISHLIST")}>
                              <FavoriteIcon />
                            </Tooltip>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <p className="interested">{t("NOT_INTERESTED")}</p> */}
                  {status ? (
                    role === "buyer" ? (
                      <div className="cart_count">
                        <div className="cart-btn-container">
                          <div className="row">
                            <>
                              {cart ? (
                                <div className="col-md-6 col-12 pl-0 pr-0">
                                  <button className="btn completed">
                                    <AddShoppingCartIcon />
                                    <span>{t("COMPLETED_CART")}</span>
                                  </button>
                                </div>
                              ) : (
                                <div className="col-md-6 col-12 pl-0 pr-0">
                                  <button className="btn" onClick={createOrder}>
                                    <AddShoppingCartIcon />
                                    <span>{t("ADD_TO_CART")}</span>
                                  </button>
                                </div>
                              )}

                              <div className="col-md-6 col-12 pl-0 pr-0">
                                <button
                                  className="btn"
                                  onClick={() => setVisibleNegotiate(true)}
                                >
                                  <AddShoppingCartIcon />
                                  <span>{t("NEGOTIATE_PRICE")}</span>
                                </button>
                              </div>
                            </>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="cart_count">
                        <div className="cart-btn-container">
                          <div className="row">
                            <div className="col-md-6 col-12 pl-0 pr-0">
                              <button className="btn">
                                <AddShoppingCartIcon />
                                <span>{t("ADD_TO_CART")}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="cart_count">
                      <div className="cart-btn-container">
                        <div className="row">
                          <div className="col-md-6 col-12 pl-0 pr-0">
                            <Link to="/login/buyer">
                              <button className="btn">
                                <AddShoppingCartIcon />
                                <span>{t("ADD_TO_CART")}</span>
                              </button>
                            </Link>
                          </div>
                          <div className="col-md-6 col-12 pl-0 pr-0">
                            <Link to="/login/buyer">
                              <button className="btn">
                                <AddShoppingCartIcon />
                                <span>{t("NEGOTIATE_PRICE")}</span>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <MakeNegotiate
                title={t('MAKE_NEGOTIT')}
                count={count}
                dataIndex={product.id}
                visible={visibleNegotiate}
                onCancel={() => setVisibleNegotiate(false)}
                handlingProps={() => setVisibleNegotiate(false)}
              />
              <div className="col-lg-4 col-12">
                <div className="reviews-container">
                  <h2>{t("REVIEWS")}</h2>
                  <div className="reviews">
                    <div className="row">
                      {product.reviews.map((item, key) => (
                        <Review
                          rating={item.rating}
                          image={item.buyer.image}
                          name={item.buyer.name}
                          content={item.content}
                          key={key}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="related-items">
              <h1>{t("RELATED_ITEMS")}</h1>
              <div className="products">
                <div className="row">
                  {product.related.map((item, key) => (
                    <div className="col-md-3 col-12" key={key}>
                      <Product
                        price={item.price}
                        name={item.seller.name}
                        title={item.title}
                        rate={item.rate}
                        cart={item.cart}
                        id={item.id}
                        image={item.images[0]}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return <Spinner width="100%" height="100vh" />;
  }
};

export default withRouter(Show);
