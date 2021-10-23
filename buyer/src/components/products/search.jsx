import React, { useState, useEffect } from "react";
import { Fetch } from "../common/actions";
import Spinner from "../layouts/spinner/spinner";
import { Breadcrumb } from "antd";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Input,Empty } from "antd";
import Product from "./product";

/// icons

import SearchIcon from "@material-ui/icons/Search";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState();
  const [search, setSearch] = useState();

  const params = useParams();

  const { t } = useTranslation();

  const searchInput = () => {
    Fetch(`search/${search}`, "buyer").then((res) => {
      if (res.status) {
        setProducts(res.data);
      } else {
        console.log("error");
      }
    });
  };
  useEffect(() => {
    /// Fetch Products
    Fetch(`search/${params.search}`, "buyer").then((res) => {
      if (res.status) {
        setProducts(res.data);
        setLoading(true);
      } else {
        console.log("error");
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
            <Breadcrumb.Item>{t("SEARCH")}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="content-container">
          <div className="col-lg-9 col-12 mx-auto">
            <div className="search-container">
              <div className="search-bar">
                <Input
                  type="text"
                  name="search"
                  placeholder={t("SEARCH_FOR_PRODUCTS")}
                  onChange={(event) => setSearch(event.target.value)}
                />
                {search ? <SearchIcon onClick={searchInput} /> : null}
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="products-items">
              <div className="products-container">
                <div className="row">
                  {products.length > 0 ? (
                    products.map((item, key) => (
                      <div className="col-md-4 col-lg-3 col-12" key={key}>
                        <Product
                          price={item.price}
                          name={item.seller.name}
                          title={item.title}
                          rate={item.rate}
                          id={item.id}
                          image={item.images[0]}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-12">
                      <div className="not_found">
                        <Empty description="Not Matching Search" />
                      </div>
                    </div>
                  )}
                </div>
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

export default Search;
