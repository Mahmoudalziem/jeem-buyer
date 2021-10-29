import { useTranslation } from "react-i18next";
import { Table, Empty } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useSelector } from "react-redux";

const Index = (props) => {
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const { name, city, phone, image } = useSelector((s) => s.seller);

  useEffect(() => {
    props.PrintPdf.current = print;
  }, []);

  const print = (data) => {
    setData(data);
    console.log(data);
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
          // position: "absolute",
          width: "210mm",
          minHeight: "100mm",
          marginLeft: "auto",
          marginRight: "auto",
          top: 0,
          left: 0,
          // zIndex: -1,
        }}
      >
        <div className="container">
          <div className="row">
            {data ? (
              <div className="col-12">
                <div className="invoice-content">
                  <div className="invoice-details">
                    <div className="invoice-top d-flex">
                      <div className="company-name text-left">
                        <div>
                          <span>Company Name : </span>
                          <span>{name}</span>
                        </div>
                        <div>
                          <span>Phone : </span>
                          <span>{phone}</span>
                        </div>
                        <div>
                          <span>City : </span>
                          <span>{`${city} - Kingdom of Saudi Arabia`}</span>
                        </div>
                      </div>
                      <div className="company-logo">
                        <img src={image} alt="logo" />
                      </div>
                      <div className="company-name">
                        <div>
                          <span>{t("COMPANY_NAME")} : </span>
                          <span>{name}</span>
                        </div>
                        <div>
                          <span>{t("PHONE")} : </span>
                          <span>{phone}</span>
                        </div>
                        <div>
                          <span>{t("CITY")} : </span>
                          <span>{`${city} - المملكة العربية السعودية`}</span>
                        </div>
                      </div>
                    </div>

                    <div className="invoice-bottom">
                      <div className="invoice-buyer-info">
                        <div className="container">
                          <div className="container-content">
                            <div className="price-content d-flex">
                              <div>
                                <span>ه . H</span>
                                <span></span>
                              </div>
                              <div>
                                <span>ريال . S.R</span>
                                <span></span>
                              </div>
                            </div>
                            <div className="receipt-content">
                              <span>سند القبض</span>
                              <span>RECEIPT VOUCHER</span>
                            </div>
                            <div className="number-content">
                              <span>No . </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="voucher-content">
                        <div className="container">
                          <div className="row">
                            <div className="col-3">12</div>
                            <div className="col-6">34</div>
                            <div className="col-3">34</div>
                          </div>
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
