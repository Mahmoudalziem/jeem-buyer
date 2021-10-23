import Table from "../../common/table";
import Columns from "../../common/columnTable";
import { useTranslation } from "react-i18next";
import React, { Fragment, useEffect, useState } from "react";
import { Fetch } from "../../common/actions";
import UploadFile from "./upload";

const Products = () => {

  const [active, setActive] = useState(false);
  const [data, setData] = useState([{ title: "Loading ..." }]);

  const { t } = useTranslation();

  const columns = [
    {
      label: t('id'),
      name: 'id',
    },
    {
      label: t("product.title"),
      name: "title",
    },
    {
      label: t("product.price"),
      name: "price",
    },
    {
      label: t("product.discount"),
      name: "discount",
    },
    {
      label: t("product.max"),
      name: "max_neg",
    },
    {
      label: t("product.count"),
      name: "count",
    },
  ];

  useEffect(() => {
    Fetch("product").then((res) => {
      if (res.status) {
        setData(res.data);
      }else{
        setData([]);
      }
    });
  }, []);

  return (
    <Fragment>
      <div className="products-dropbox">
        <div className="product-container">
          <div className="head" onClick={() => setActive(!active)}>
            <span>{t("Products Upload")}</span>
            <span>
              <i className="fa fa-angle-down icon-arrow-down"></i>
            </span>
          </div>

          <div className={`content ${active ? "active" : ""}`}>
            <div className="details">
              <UploadFile accept=".xlsx" action="excel" />
            </div>
          </div>
        </div>

        <div className="products-table">
          <Table
            dataTable={data}
            table="product"
            Columns={Columns("product", columns)}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Products;
