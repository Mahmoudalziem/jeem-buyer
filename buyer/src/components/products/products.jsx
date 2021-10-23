import React, { useState, useEffect } from "react";
import { Fetch, Create } from "../common/actions";
import Spinner from "../layouts/spinner/spinner";
import { useTranslation } from "react-i18next";
import { Form, Checkbox, SubmitButton } from "formik-antd";
import { Col, Select, Slider, Breadcrumb, Empty } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import Input from "@material-ui/core/Input";
// import Slider from "@material-ui/core/Slider";
import Product from "./product";

const { Option } = Select;

const Categories = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(true);
  const [priceBtn, setPriceActive] = useState(false);
  const [cityBtn, setCityActive] = useState(false);
  const [filterBtn, setFilterActive] = useState(false);
  const [price, setPrice] = useState([0, 10000]);
  const [total, setTotal] = useState();
  const [perpage, setPerPage] = useState();
  const [activePage, setActivePage] = useState();

  const { t } = useTranslation();

  const initialValues = { city: "" };

  const validationSchema = () =>
    Yup.object({
      city: Yup.array().required(),
    });

  const submitForm = (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);

    values.price = price;

    setFilter(false);

    Create("filter", values, "buyer", false).then((res) => {
      if (res.status) {
        res.data && res.data.data
          ? setProducts(res.data.data)
          : setProducts(res.data);

        setFilter(true);
      }
    });
  };

  const handlePageChange = (pageNumber) => {
    Fetch(`products?page=${pageNumber}`, "buyer").then((res) => {
      if (res.status) {
        let data = res.data;

        if (data && data.data) {
          setProducts(res.data.data);
          setTotal(data.total);
          setPerPage(data.per_page);
          setActivePage(data.current_page);
        } else {
          setProducts(res.data);
        }

        setLoading(true);
      } else {
        console.log("error");
      }
    });

    setActivePage(pageNumber);
  };

  const sortProduct = (event) => {
    setFilter(false);
    Fetch(`sort/${event}`, "buyer").then((res) => {
      if (res.status) {
        res.data && res.data.data
          ? setProducts(res.data.data)
          : setProducts(res.data);
        setFilter(true);
      }
    });
  };
  useEffect(() => {
    /// Fetch Products
    Fetch("products", "buyer").then((res) => {
      if (res.status) {
        let data = res.data;

        if (data && data.data) {
          setProducts(res.data.data);
          setTotal(data.total);
          setPerPage(data.per_page);
          setActivePage(data.current_page);
        } else {
          setProducts(res.data);
        }

        setLoading(true);
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="category">
        <div className="category-header">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">{t("HOME")}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{t("PRODUCTS")}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="content-container">
          <div className="row">
            <div className="col-lg-3 col-12">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submitForm}
              >
                {(formik) => (
                  <Form>
                    <div className={`left ${filterBtn ? "active" : ""}`}>
                      <button
                        className="close"
                        onClick={() => {
                          setFilterActive(!filterBtn);
                        }}
                      >
                        X
                      </button>
                      <h3>{t("FILTER")}</h3>

                      <div
                        id="price-btn"
                        onClick={() => {
                          setPriceActive(!priceBtn);
                        }}
                        className="price-btn"
                      >
                        {t("PRICE")}
                      </div>

                      <div
                        className={`price-range ${!priceBtn ? "active" : " "}`}
                      >
                        <div className="price-start">
                          <Input
                            className="price-start"
                            value={price[0]}
                            onChange={(event) =>
                              setPrice(Number(event.target.value))
                            }
                            inputProps={{
                              // step: 500,
                              min: 0,
                              max: 10000,
                              type: "number",
                              "aria-labelledby": "input-slider",
                            }}
                          />{" "}
                          SAR
                        </div>
                        <Slider
                          className="price-slider"
                          onChange={(event) => setPrice(event)}
                          range
                          min={0}
                          max={10000}
                          defaultValue={[0, 10000]}
                        />
                        <div className="price-end">
                          <Input
                            className="price-end"
                            value={price[1]}
                            onChange={(event) =>
                              setPrice(Number(event.target.value))
                            }
                            inputProps={{
                              // step: 500,
                              min: 0,
                              max: 10000,
                              type: "number",
                              "aria-labelledby": "input-slider",
                            }}
                          />{" "}
                          SAR
                        </div>
                      </div>
                      <div
                        className="city-btn"
                        onClick={() => {
                          setCityActive(!cityBtn);
                        }}
                      >
                        {t("CITY")}
                      </div>
                      <div
                        className={`city-selection ${cityBtn ? "active" : " "}`}
                      >
                        <Checkbox.Group className="w-100" name="city">
                          <Col span={24}>
                            <Checkbox value="madina">{t("MADINA")}</Checkbox>
                          </Col>
                          <Col span={24}>
                            <Checkbox value="riyadh">{t("RIYADH")}</Checkbox>
                          </Col>
                          <Col span={24}>
                            <Checkbox value="jeddah">{t("JEDDAH")}</Checkbox>
                          </Col>
                          <Col span={24}>
                            <Checkbox value="tammam">{t("TAMMAM")}</Checkbox>
                          </Col>
                        </Checkbox.Group>
                      </div>
                      <SubmitButton className="apply" disabled={false}>
                        {t("APPLY")}
                      </SubmitButton>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>

            <div className="col-lg-9 col-12">
              <div className="products-items">
                <div className="sort">
                  <label htmlFor="sort">{t("SORT")} : </label>
                  <Select
                    name="sort"
                    style={{ width: 200 }}
                    placeholder={t("SORT")}
                    optionFilterProp="children"
                    onChange={sortProduct}
                  >
                    <Option value="recent">{t("RECENT")}</Option>
                    <Option value="all">{t("All_PRODUCTS")}</Option>
                    <Option value="hight">{t("PRICE_HIGH")}</Option>
                    <Option value="low">{t("PRICE_LOW")}</Option>
                  </Select>
                </div>

                {filter ? (
                  <div className="products-container">
                    <div className="row">
                      {products.length > 0 ? (
                        products.map((item, index) => (
                          <div className="col-md-6 col-lg-4 col-12" key={index}>
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
                        <Empty
                          className="w-100 p-5"
                          description="Not Found Products"
                        />
                      )}
                    </div>
                    <Pagination
                      activePage={activePage}
                      itemsCountPerPage={perpage}
                      totalItemsCount={total}
                      pageRangeDisplayed={5}
                      onChange={handlePageChange}
                    />
                  </div>
                ) : (
                  <Spinner height="150px" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Spinner width="100%" height="100vh" />;
  }
};

export default Categories;
