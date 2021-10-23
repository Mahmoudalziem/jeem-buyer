import Table from "../../common/table";
import { useTranslation } from "react-i18next";
import { Tooltip, Button, InputNumber, Input } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import Spinner from "../../layouts/spinner/spinner";
import { sendPrice } from "./actions";
import { Fetch } from "../../common/actions";
import { ViewMessage } from "./modals";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PublishIcon from "@material-ui/icons/Publish";

//icons

import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const Products = () => {
  const [data, setData] = useState([{ title: "Loading ..." }]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([]);

  const [visibleNegotiate, setvisibleNegotiate] = useState([]);

  const handlingPrice = (value, rowIndex) => {
    setPrice(() => {
      const newLoadings = [...price];

      newLoadings[rowIndex] = value;

      return newLoadings;
    });
  };
  const { t } = useTranslation();

  const enterMeetingVisible = (index, zoomId) => {
    for (let x in visibleNegotiate) {
      visibleNegotiate[x] = false;
    }
    setvisibleNegotiate(() => {
      const newLoadings = [...visibleNegotiate];

      newLoadings[index] = true;

      return newLoadings;
    });
  };

  const handlingMeetingProps = (index) => {
    setvisibleNegotiate(() => {
      const newLoadings = [...visibleNegotiate];

      newLoadings[index] = false;

      return newLoadings;
    });
  };

  const handleMeetingCancel = (index) => {
    setvisibleNegotiate(() => {
      const newLoadings = [...visibleNegotiate];

      newLoadings[index] = false;

      return newLoadings;
    });
  };

  const acceptNegotiate = (index, updateIndex) => {
    Fetch(`negotiate/accept/${index}`, "seller", true).then((res) => {
      if (!res.data.status) {
        const newData = [...data];

        const item = newData.find(({ id }) => id === index);

        newData.splice(item, 1);

        setData(newData);
      }
    });
  };

  const rejectNegotiate = (index, updateIndex) => {
    Fetch(`negotiate/reject/${index}`, "seller", true).then((res) => {
      if (!res.data.status) {
        const newData = [...data];

        const item = newData.find(({ id }) => id === index);

        newData.splice(item, 1);

        setData(newData);
      }
    });
  };

  useEffect(() => {
    Fetch("negotiate").then((res) => {
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
      name: "buyer.name",
    },
    {
      label: t("product.price"),
      name: "price",
    },
    {
      label: t("SELLER"),
      name: "price_seller",
      options: {
        filter: false,
        empty: true,
        customBodyRender: (dataIndex, rowIndex, updateIndex) => {
          return (
            <Fragment>
              <Input.Group compact>
                <InputNumber
                  defaultValue={dataIndex}
                  name="price"
                  disabled={dataIndex === "pending" || dataIndex ? true : false}
                  placeholder="Price Value"
                  formatter={(value) =>
                    `SAR ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  step="number"
                  parser={(value) => value.replace(/\SAR\s?|(,*)/g, "")}
                  onChange={(value) => handlingPrice(value, rowIndex.rowIndex)}
                />
                <Button
                  disabled={dataIndex === "pending" || dataIndex ? true : false}
                  onClick={() => {
                    sendPrice(
                      rowIndex.tableData[rowIndex.rowIndex].id,
                      price[rowIndex.rowIndex]
                        ? price[rowIndex.rowIndex]
                        : dataIndex,
                      updateIndex
                    );
                  }}
                >
                  <PublishIcon />
                </Button>
              </Input.Group>
            </Fragment>
          );
        },
      },
    },
    {
      label: t("Actions"),
      name: "price_seller",
      options: {
        filter: false,
        empty: true,
        customBodyRender: (dataIndex, rowIndex, updateIndex) => {
          return (
            <Fragment>
              <Button
                onClick={() =>
                  enterMeetingVisible(rowIndex.rowIndex, dataIndex)
                }
              >
                <VisibilityIcon />
              </Button>
              <Tooltip title="Negotiate Accept" placement="bottom">
                <Button
                  onClick={() =>
                    acceptNegotiate(
                      rowIndex.tableData[rowIndex.rowIndex].id)
                  }
                >
                  <AddIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Negotiate Reject" placement="bottom">
                <Button
                  onClick={() =>
                    rejectNegotiate(
                      rowIndex.tableData[rowIndex.rowIndex].id)
                  }
                >
                  <CloseIcon />
                </Button>
              </Tooltip>
              <ViewMessage
                visible={visibleNegotiate[rowIndex.rowIndex]}
                onCancel={() => handleMeetingCancel(rowIndex.rowIndex)}
                title="View Negotiate"
                dataIndex={rowIndex.tableData[rowIndex.rowIndex].notes}
                handlingProps={() => handlingMeetingProps(rowIndex.rowIndex)}
              />
            </Fragment>
          );
        },
      },
    },
  ];

  const options = {};

  if (loading) {
    return (
      <Fragment>
        <div className="products-dropbox">
          <div className="products-table">
            <Table
              dataTable={data}
              table="negotiate"
              Columns={columns}
              options={options}
            />
          </div>
        </div>
      </Fragment>
    );
  } else {
    return <Spinner />;
  }
};

export default Products;
