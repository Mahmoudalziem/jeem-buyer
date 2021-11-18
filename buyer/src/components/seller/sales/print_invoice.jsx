import { useTranslation } from "react-i18next";
import { Table, Empty } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useSelector } from "react-redux";

const Index = (props) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const { t } = useTranslation();
  const { name, city, phone, image } = useSelector((s) => s.seller);

  useEffect(() => {
    props.PrintPdf.current = print;
  }, []);

  const print = (tab, data) => {
    if (tab) {
      let newData = [];

      data.map((item) =>
        newData.push({
          buyer: item.buyer.name,
          count: item.count,
          descri: item.descri,
          discount: item.discount,
          id: item.id,
          price: item.price,
          title: item.title,
          total: item.total,
        })
      );
      setData(newData);
      setColumns([
        {
          title: t("id"),
          dataIndex: "id",
        },
        {
          title: t("CUSTOMER"),
          dataIndex: "buyer",
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
      ]);
    } else {
      let newData = [];
      data.map((item) =>
        newData.push({
          buyer: item.buyer.name,
          count: item.counts,
          discount: item.discount,
          id: item.id,
          price: item.price,
          title: item.product.title,
          total: item.counts * item.price,
        })
      );
      setData(newData);
      setColumns([
        {
          title: t("id"),
          dataIndex: "id",
        },
        {
          title: t("CUSTOMER"),
          dataIndex: "buyer",
        },
        {
          title: t("product.title"),
          dataIndex: "title",
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
      ]);
    }
    const input = document.getElementById("invoice");
    html2canvas(input, {
      logging: true,
      letterRendering: 1,
      allowTaint: false,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("sales.pdf");
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
                        <span>{t("PHONE")} : </span>
                        <span>{phone}</span>
                      </div>
                      <div>
                        <span>{t("CITY")} : </span>
                        <span>{city}</span>
                      </div>
                      <div>
                        <span>{t("INVOICE_DATA")} : </span>
                        <span>{`${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDay()}`}</span>
                      </div>
                      <div>
                        <span>{t("INVOICE_NUMBER")} : </span>
                        <span>{`JOD${new Date().getMilliseconds()}99`}</span>
                      </div>
                    </div>
                  </div>

                  <div className="invoice-bottom">
                    <div className="invoice-orders">
                      <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                      />
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
    </Fragment>
  );
};

export default Index;
