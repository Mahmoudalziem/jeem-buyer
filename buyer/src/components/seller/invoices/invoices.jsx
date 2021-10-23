import { useTranslation } from "react-i18next";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import Spinner from "../../layouts/spinner/spinner";
import { Delete, Fetch } from "../../common/actions";
import { useSelector } from "react-redux";

const Products = () => {
  const [loadings, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  const { name,email, address, image} = useSelector(
    (s) => s.seller
  );
  const columns = [
    {
      title: t('code'),
      dataIndex: "code",
    },
    {
      title: t('product.title'),
      dataIndex: "title",
    },
    {
      title: t('product.count'),
      dataIndex: "count",
    },
    {
      title: t('product.price'),
      dataIndex: "price",
    },
  ];
  
  const dataTable = [
    {
      key: "1",
      code: "RT45667445ER",
      title: "Hello Come Back",
      count: 3,
      price: "700 ASR",
    },
  ];

  useEffect(() => {
    Fetch("invoice").then((res) => {
      if (res.status) {
        setData(res.data);
        setLoading(true);
      }else{
        setLoading(true);
        setData(null);
      }
    });
  }, []);

  const deleteAction = (index) => {

    setActive(true);

    if(Delete('invoice',index)){

      setVisible(false);

      setActive(false);

    }

  };

  if (loadings) {
    return (
      <Fragment>
        <div className="invoice">
          <div className="container">
            <div className="row">
              <div className="col-md-10 col-12 m-auto">
                <div className="invoice-content mt-5">
                  <div className="invoice-details">
                    <div className="invoice-top d-flex">
                      <div className="company-logo">
                        <img src={data.image} alt="logo" />
                        <div className="company-options">
                          <Button>
                            {data.id ? (
                              <Link to={`/dashboard/invoice/${data.id}/edit`}>
                                Update
                              </Link>
                            ) : (
                              <Link to={`/dashboard/invoice/create`}>
                                Create
                              </Link>
                            )}
                          </Button>
                          {/* {data.id ? (
                            <Popconfirm
                              title={t(`invoice.status`)}
                              placement="bottomLeft"
                              visible={visible}
                              onConfirm={() => deleteAction(data.id)}
                              okButtonProps={{ loading: active }}
                              onCancel={() => setVisible(false)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button onClick={() => setVisible(true)}>
                                Delete
                              </Button>
                            </Popconfirm>
                          ) : (
                            false
                          )} */}
                        </div>
                      </div>
                      <div className="company-name">
                        <span>{t('COMPANY_NAME')} : </span>
                        <span>{data.name}</span>
                      </div>
                    </div>

                    <div className="invoice-bottom">
                      <div className="invoice-buyer-info">
                        <div className="invoice-buyer">
                          <div>
                            <span>{t('TO')} :</span> <span>{t(name)}</span>
                          </div>
                          <div>
                            <span>{t('ADDRESS')} :</span>{" "}
                            <span>{address}</span>
                          </div>
                          <div>
                            <span>{t('EMAIL')} :</span>{" "}
                            <span>{email}</span>
                          </div>
                        </div>

                        <div className="invoice-info">
                          <ul>
                            <li>
                              <span>{t('INVOICE_DATA')} : </span>
                              <span>2021/9/8</span>
                            </li>
                            <li>
                              <span>{t('INVOICE_NUMBER')} : </span>
                              <span>RT45667445ER</span>
                            </li>
                            <li>
                              <span>{t('PAYMENT_METHOD')} : </span>
                              <span>Cash</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="invoice-orders">
                        <Table
                          columns={columns}
                          dataSource={dataTable}
                          pagination={false}
                        />
                      </div>
                    </div>

                    <div className="invoice-total d-flex">
                      <div className="total">
                        <span>{t('product.price')} : </span>
                        <span>5000 ASR</span>
                      </div>
                      <div className="code">
                        <span>{t('code')} : </span>
                        <span>&TYG5664355YT&</span>
                      </div>
                    </div>

                    <div className="invoice-footer">
                      All Data in This Invoice Belongs to Company
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return <Spinner />;
  }
};

export default Products;
