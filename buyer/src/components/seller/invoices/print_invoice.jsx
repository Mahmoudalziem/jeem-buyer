import { useTranslation } from "react-i18next";
import { Table, Empty } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useSelector } from "react-redux";

const Index = (props) => {
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const { t } = useTranslation();

  const { name, address, city, phone, image } = useSelector((s) => s.seller);

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
    const newRows = [];
    props.PrintPdf.current = print;
    props.rows.map((item, parent) =>
      item.map((content, child) => console.log(content))
    );
  }, []);

  const print = (values) => {
    setData(values);
    console.log(props.rows, props.rowsObject, props.rowsEnterObject);
    const input = document.getElementById("invoice");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
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
                      <div className="company-name text-right">
                        <div>
                          <span>{t("COMPANY_NAME")} : </span>
                          <span>{name}</span>
                        </div>
                        <div>
                          <span>{t("TAX_NUMBER")} : </span>
                          <span>{data.tax}</span>
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
                            <span>{t("TO")} :</span> <span>{data.name}</span>
                          </div>
                          <div>
                            <span>{t("ADDRESS")} :</span>{" "}
                            <span>{data.address}</span>
                          </div>
                        </div>

                        <div className="invoice-info">
                          <ul>
                            <li>
                              <span>{t("INVOICE_DATA")} : </span>
                              <span>{new Date().getFullYear()}</span>
                            </li>
                            <li>
                              <span>{t("INVOICE_NUMBER")} : </span>
                              <span>{`JOD${new Date().getDate()}99`}</span>
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
                      <div
                        className="total"
                        style={{
                          textAlign: "right",
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
                          <span>{data.price} ASR</span>
                        </div>
                        <div>
                          <span>{t("product.paied")} : </span>
                          <span>{data.price} ASR</span>
                        </div>
                        <div>
                          <span>{t("product.price_due")} : </span>
                          <span>{data.price} ASR</span>
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
