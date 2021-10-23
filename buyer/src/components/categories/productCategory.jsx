import React, { useState, useEffect } from "react";
import { Fetch } from "../common/actions";
import Spinner from "../layouts/spinner/spinner";
import { useParams,Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Product from "../products/product";
import { Breadcrumb, Empty } from "antd";

const ProductSubCategory = (props) => {
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState();

  const { t, i18n } = useTranslation("translations");

  const params = useParams();

  useEffect(() => {
    /// Fetch Categories
    Fetch(`sub-category/${params.subcategory}/products`, "buyer").then(
      (res) => {
        if (res.status) {
          setCategory(res.data);
          setLoading(true);
        } else {
          console.log("error");
        }
      }
    );
  }, []);

  if (loading) {
    return (
      <div className="category">
        <div className="container">
          <div className="category-header">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/">{t("HOME")}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={`/category/${params.category}`}>
                  {t("CATEGORIES")}
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{t("SUBCATEGORIES")}</Breadcrumb.Item>
              <Breadcrumb.Item>{t("RELATED_ITMES")}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="row">
            {category.length > 0 ? (
              category.map((item, key) => (
                <div className="col-lg-3 col-md-6 col-12" key={key}>
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
              <Empty description="Not Found Products" className="w-100 p-5" />
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <Spinner width="100%" height="100vh" />;
  }
};

export default ProductSubCategory;
