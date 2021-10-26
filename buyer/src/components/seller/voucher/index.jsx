import React, { useState, useEffect, Fragment } from "react";
import Table from "../../common/table";
import { useTranslation } from "react-i18next";
import { Fetch } from "../../common/actions";
import Spinner from "../../layouts/spinner/spinner";

const Sales = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([{ title: "Loading ..." }]);

  const { t } = useTranslation();

  const columns = [
    {
      label: t("id"),
      name: "id",
    },
    {
      label: t("Name"),
      name: "name",
    },
    {
      label: t("product.price"),
      name: "price",
    },
    {
      label: t("CHECK_NUMBER"),
      name: "check",
    },
    {
      label: t("RECEIVER"),
      name: "receiver",
    },
    {
      label: t("THAT_FOR"),
      name: "for",
    },
  ];

  useEffect(() => {
    Fetch("voucher").then((res) => {
      if (res.status) {
        setData(res.data);
        setLoading(true);
      } else {
        setData([]);
        setLoading(true);
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="products-table container">
        <Table dataTable={data} table="order" Columns={columns} options={{}} />
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default Sales;
