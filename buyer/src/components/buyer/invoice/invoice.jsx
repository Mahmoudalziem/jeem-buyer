import { useTranslation } from "react-i18next";
import { Table, Empty } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import Spinner from "../../layouts/spinner/spinner";
import { Fetch } from "../../common/actions";
import { useParams } from "react-router-dom";

const Products = () => {
  const [loadings, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  const params = useParams();

  const columns = [
    
    {
      title: t("code"),
      dataIndex: "code",
    },
    {
      title: t("product.title"),
      dataIndex: "product",
    },
    {
      title: t("product.count"),
      dataIndex: "count",
    },
    {
      title: t("product.price"),
      dataIndex: "price",
    },
  ];


  useEffect(() => {
    Fetch(`invoice/${params.id}`, "buyer").then((res) => {
      if (res.status) {
        setData(res.data);
        setLoading(true);
      }
    });
  }, []);

  if (loadings) {
    return (
      <Fragment>
        <div className="invoice">
          <div className="container">
            <div className="row">
              {data ? (
                <div className="col-12">
                  <div className="invoice-content">
                    <div className="invoice-details">
                      <div className="invoice-top d-flex">
                        <div className="company-logo">
                          <img src={data.c_image} alt="logo" />
                        </div>
                        <div className="company-name">
                          <span>{t("COMPANY_NAME")} : </span>
                          <span>{data.c_name}</span>
                        </div>
                      </div>

                      <div className="invoice-bottom">
                        <div className="invoice-buyer-info">
                          <div className="invoice-buyer">
                            <div>
                              <span>{t("TO")} :</span> <span>{data.name}</span>
                            </div>
                            <div>
                              <span>{t("ADDRESS")} :</span>{" "}
                              <span>{data.address}</span>
                            </div>
                            <div>
                              <span>{t("EMAIL")} :</span> <span>{data.email}</span>
                            </div>
                          </div>

                          <div className="invoice-info">
                            <ul>
                              <li>
                                <span>{t("INVOICE_DATA")} : </span>
                                <span>{data.create}</span>
                              </li>
                              <li>
                                <span>{t("INVOICE_NUMBER")} : </span>
                                <span>{data.code}</span>
                              </li>
                              <li>
                                <span>{t("PAYMENT_METHOD")} : </span>
                                <span>Cash</span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="invoice-orders">
                          <Table
                            columns={columns}
                            dataSource={[data]}
                            pagination={false}
                          />
                        </div>
                      </div>

                      <div className="invoice-total d-flex">
                        <div className="total">
                          <span>{t("product.price")} : </span>
                          <span>{data.price} ASR</span>
                        </div>
                        <div className="code">
                          <span>{t("code")} : </span>
                          <span>&{data.in_code}&</span>
                        </div>
                      </div>

                      <div className="invoice-footer">
                        All Data in This Invoice Belongs to Company
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-12 p-5">
                  <Empty className="w-100" description="Not Found Orders" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return <Spinner width="100%" height="100vh" />;
  }
};

export default Products;
