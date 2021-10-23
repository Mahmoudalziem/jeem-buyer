import Table from "../../common/table";
import { useTranslation } from "react-i18next";
import { Button, Tooltip } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import Spinner from "../layouts/spinner/spinner";
import { Fetch } from "../../common/actions";

//Icons

import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const Negotiate = () => {
  const [data, setData] = useState([{ title: "Loading ..." }]);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const acceptNegotiate = (index, updateIndex) => {
    Fetch(`negotiate/accept/${index}`, "buyer", true).then((res) => {
      if (!res.data.status) {
        const newData = [...data];

        const item = newData.find(({ id }) => id === index);

        newData.splice(item, 1);

        setData(newData);
      }
    });
  };

  const rejectNegotiate = (index, updateIndex) => {
    Fetch(`negotiate/reject/${index}`, "buyer", true).then((res) => {
      if (!res.data.status) {
        const newData = [...data];

        const item = newData.find(({ id }) => id === index);

        newData.splice(item, 1);

        setData(newData);
      }
    });
  };

  useEffect(() => {
    Fetch("negotiate", "buyer").then((res) => {
      if (res.status) {
        setData(res.data);
        setLoading(true);
      } else {
        setData([]);
        setLoading(true);
      }
    });
  }, []);

  const columns = [
    {
      label: t("product.title"),
      name: "product.title",
    },
    {
      label: t("product.count"),
      name: "count",
    },
    {
      label: t("CUSTOMER"),
      name: "buyer",
    },
    {
      label: t("product.price"),
      name: "price",
    },
    {
      label: t("SELLER"),
      name: "price_seller",
    },
    {
      label: t("Actions"),
      name: "id",
      options: {
        filter: false,
        empty: true,
        customBodyRender: (dataIndex, rowIndex) => {
          return rowIndex.tableData[rowIndex.rowIndex].price_seller !== 'processing' ? (
            <Fragment>
              <Tooltip title="Negotiate Accept" placement="bottom">
                <Button onClick={() =>
                    acceptNegotiate(
                      rowIndex.tableData[rowIndex.rowIndex].id)
                  }>
                  <AddIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Negotiate Reject" placement="bottom">
                <Button onClick={() =>
                    rejectNegotiate(
                      rowIndex.tableData[rowIndex.rowIndex].id)
                  }>
                  <CloseIcon />
                </Button>
              </Tooltip>
            </Fragment>
          ) : null;
        },
      },
    },
  ];

  if (loading) {
    return (
      <Fragment>
        <div className="products-dropbox">
          <div className="products-table">
            <Table dataTable={data} table="meeting" Columns={columns} />
          </div>
        </div>
      </Fragment>
    );
  } else {
    return <Spinner width="100%" height="100vh" />;
  }
};

export default Negotiate;
