import { useTranslation } from "react-i18next";
import { Table, Empty } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { useSelector } from "react-redux";
import * as htmlToImage from "html-to-image";

const Index = (props) => {
  const [data, setData] = useState([]);
  const [info, setInfo] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const { t } = useTranslation();

  const { name, city, phone, image } = useSelector((s) => s.seller);

  const columns = [
    {
      title: t("id"),
      dataIndex: "id",
    },
    {
      title: t("product.title"),
      dataIndex: "title",
    },
    {
      title: t("PRODUCT_DESCRIPTION"),
      dataIndex: "descri",
    },
    {
      title: t("product.count"),
      dataIndex: "count",
    },
    {
      title: t("product.price"),
      dataIndex: "price",
    },
    {
      title: t("product.total"),
      dataIndex: "total",
    },
  ];

  useEffect(() => {
    props.PrintPdf.current = print;
  }, []);

  const print = (values, data) => {
    setInfo(values);
    setData(data);
    let TotalPrice = 0;
    data.map((item) => (TotalPrice += item.total));
    setTotalPrice(TotalPrice);
    const input = document.getElementById("invoice");
    htmlToImage.toPng(input,{ cacheBust: true }).then((image) => {
      const pdf = new jsPDF();
      pdf.addImage(image, "PNG", 0, 0);
      pdf.save("invoice.pdf");
    });
  };
  return (
    <Fragment>
      <div
        className="invoice"
        id="invoice"
        style={{
          position: "absolute",
          width: "210mm",
          minHeight: "100mm",
          marginLeft: "auto",
          marginRight: "auto",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <div className="container">
          <div className="row">
            {data ? (
              <div className="col-12">
                <div className="invoice-content">
                  <div className="invoice-details">
                    <div className="invoice-top d-flex">
                      <div className="company-logo">
                        <img src={image} alt="logo" />
                      </div>
                      <div className="company-name">
                        <div>
                          <span>{t("COMPANY_NAME")} : </span>
                          <span>{name}</span>
                        </div>
                        <div>
                          <span>{t("TAX_NUMBER")} : </span>
                          <span>{info.tax}</span>
                        </div>
                        <div>
                          <span>{t("PHONE")} : </span>
                          <span>{phone}</span>
                        </div>
                        <div>
                          <span>{t("CITY")} : </span>
                          <span>{city}</span>
                        </div>
                      </div>
                    </div>

                    <div className="invoice-bottom">
                      <div className="invoice-buyer-info">
                        <div className="invoice-buyer">
                          <div>
                            <span>{t("TO")} :</span> <span>{info.name}</span>
                          </div>
                          <div>
                            <span>{t("ADDRESS")} :</span>{" "}
                            <span>{info.address}</span>
                          </div>
                        </div>

                        <div className="invoice-info">
                          <ul>
                            <li>
                              <span>{t("INVOICE_DATA")} : </span>
                              <span>{`${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDay()}`}</span>
                            </li>
                            <li>
                              <span>{t("INVOICE_NUMBER")} : </span>
                              <span>{`JOD${new Date().getMilliseconds()}99`}</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="invoice-orders">
                        <Table
                          columns={columns}
                          dataSource={data}
                          pagination={false}
                        />
                      </div>
                    </div>

                    <div className="invoice-total d-flex">
                      <div
                        className="total"
                        style={{
                          background: "#94664b",
                          padding: "20px",
                          lineHeight: "25px",
                          color: "#fff",
                          borderRadius: "10px",
                          border: "2px solid #161515",
                        }}
                      >
                        <div>
                          <span>{t("product.total")} : </span>
                          <span>{totalPrice} ASR</span>
                        </div>
                        <div>
                          <span>{t("product.paied")} : </span>
                          <span>0.00 ASR</span>
                        </div>
                        <div>
                          <span>{t("product.price_due")} : </span>
                          <span>{totalPrice} ASR</span>
                        </div>
                      </div>
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
};

export default Index;
