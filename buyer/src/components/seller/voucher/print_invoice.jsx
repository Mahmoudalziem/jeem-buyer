import { useTranslation } from "react-i18next";
import { Table, Empty } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { useSelector } from "react-redux";
import * as htmlToImage from "html-to-image";

const Index = (props) => {
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const { name, city, phone, image } = useSelector((s) => s.seller);

  useEffect(() => {
    props.PrintPdf.current = print;
  }, []);

  const print = (data) => {
    setData(data);
    const input = document.getElementById("invoice");
    htmlToImage.toPng(input,{ cacheBust: true }).then((image) => {
      const pdf = new jsPDF();
      pdf.addImage(image, "PNG", 0, 0);
      pdf.save("voucher.pdf");
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
                          <span>{`${city} - ?????????????? ?????????????? ????????????????`}</span>
                        </div>
                      </div>
                    </div>

                    <div className="invoice-bottom">
                      <div className="invoice-buyer-info">
                        <div className="container">
                          <div className="container-content">
                            <div className="price-content d-flex">
                              <div>
                                <span>?? . H</span>
                                <span></span>
                              </div>
                              <div>
                                <span>???????? . S.R</span>
                                <span></span>
                              </div>
                            </div>
                            <div className="receipt-content">
                              <span>?????? ??????????</span>
                              <span>RECEIPT VOUCHER</span>
                            </div>
                            <div className="number-content">
                              <span>No . </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="voucher-content mt-5">
                        <div className="container">
                          <div className="voucher_row">
                            <div className="voucher_right">
                              ?????????? ???? ?????????? / ???????????? :
                            </div>
                            <div className="voucher_center">{data.name}</div>
                            <div className="voucher_left">
                              Received From Mr./Messrs
                            </div>
                          </div>
                        </div>

                        <div className="container">
                          <div className="voucher_row">
                            <div className="voucher_right">???????? ??????????</div>
                            <div className="voucher_center w-75">
                              {data.price}
                            </div>
                            <div className="voucher_left">the Sum Of</div>
                          </div>
                        </div>

                        <div className="container">
                          <div className="voucher_row">
                            <div className="voucher_right">
                              <div className="d-flex">
                                <div>
                                  <span>????????</span>
                                  <span></span>
                                </div>
                                <div>
                                  <span>?????????? ?????? ??????</span>
                                  <span></span>
                                </div>
                              </div>
                            </div>
                            <div className="voucher_center w-57">
                              {data.check}
                            </div>
                            <div className="voucher_left">
                              <div className="d-flex">
                                <div>
                                  <span>Cache</span>
                                  <span></span>
                                </div>
                                <div>
                                  <span>Cheque No </span>
                                  <span></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="container">
                          <div className="voucher_row">
                            <div className="voucher_right">???????? ???? :</div>
                            <div className="voucher_center w-80">
                              {data.for}
                            </div>
                            <div className="voucher_left">For :</div>
                          </div>
                        </div>

                        <div className="container mt-5">
                          <div className="row">
                            <div className="col-3">
                              <div className="voucher_right">
                                ?????????????? :{" "}
                                {`${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDay()}`}
                              </div>
                            </div>
                            <div className="col-6 text-center">
                              <div
                                className="d-flex"
                                style={{
                                  flexDirection: "column",
                                  lineHeight: "35px",
                                }}
                              >
                                <span>?????????????? RECEIVER</span>
                                <span>{data.receiver}</span>
                              </div>
                            </div>
                            <div className="col-3">
                              <div className="voucher_left">
                                Date :{" "}
                                {`${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDay()}`}
                              </div>
                            </div>
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
