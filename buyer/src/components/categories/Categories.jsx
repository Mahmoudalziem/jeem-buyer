import React, { useState, useEffect } from "react";
import { Fetch } from "../common/actions";
import Spinner from "../layouts/spinner/spinner";
import { useParams,Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CategoryItem from "../common/categoryItem";
import { Breadcrumb } from "antd";

const Categories = (props) => {
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState();

  const { t, i18n } = useTranslation("translations");

  const params = useParams();

  useEffect(() => {
    /// Fetch Categories
    Fetch(`category/${params.category}`, "buyer").then((res) => {
      if (res.status) {
        setCategory(res.data);
        setLoading(true);
      } else {
        console.log("error");
      }
    });
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
              <Breadcrumb.Item>{t("CATEGORIES")}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="row">
            {category.map((item, key) => (
              <div className="col-md-3 col-12" key={key}>
                <CategoryItem
                  image={item.image}
                  title={i18n.language === "en" ? item.name_en : item.name_ar}
                  id={`${params.category}/subcategory/${item.name_en
                    .replace(/\s/g, "-")
                    .toLowerCase()}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <Spinner width="100%" height="100vh" />;
  }
};

export default Categories;
