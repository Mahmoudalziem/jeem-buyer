import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UploadFile from "./upload";
import AddProduct from "./modals";
import {
  Form as FormFormik,
  SubmitButton,
  Select,
  FormItem,
  Input,
} from "formik-antd";
import { Empty } from "antd";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Fetch, Create } from "../../common/actions";
import * as Yup from "yup";

import ProductFile from "../../../assets/files/products.xlsx";

const { Option } = Select;

const Print = (props) => {
  const [loading, isLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [manualProduct, setManualProduct] = useState([]);
  const [rows, setRows] = useState([]);
  const [rowsObject, setRowsObject] = useState([]);
  const [rowsEnterObject, setRowsEnterObject] = useState([]);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    /// Fetch Products
    Fetch("products", "buyer").then((res) => {
      if (res.status) {
        setProducts(res.data.data);
      }
    });
  }, []);

  const handleManualChange = (value) => {
    setRowsObject(value);
    setManualProduct(value);
  };

  const handleChange = (value) => {
    const newRows = [];
    value.map((item, key) =>
      newRows.push(products.find(({ id }) => item === id))
    );
    setRowsEnterObject(newRows);
  };
  const initialValues = {
    name: "",
    tax: "",
    phone: "",
    address: "",
  };

  const phoneRegExp =
    /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;

  const validateSchema = () =>
    Yup.object({
      name: Yup.string().required(t("NAME_REQUIRED")),
      tax: Yup.string().min(15).max(15).required(t("TAX_REQUIRED")),
      phone: Yup.string()
        .required(t("PHONE_REQUIRED"))
        .matches(phoneRegExp, "Phone number is not valid"),
      address: Yup.string().required(t("ADDRESS_REQUIRED")),
    });

  const submitForm = (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      return key === "productsID"
        ? formData.append(key, JSON.stringify(values[key]))
        : formData.append(key, values[key]);
    });

    if (manualProduct.length > 0) {
      formData.append("products", JSON.stringify(manualProduct));
    }

    if (file) {
      formData.append("file", file);
    }

    Create("manual_products", formData, "seller", true).then((res) => {
      if (res.status) {
        isLoading(false);

        // resetForm({});
      }
    });
  };

  const ImportFile = (file, data) => {
    data.splice(0, 1);
    const newRows = [...rows];
    data.map((item) => newRows.push(item));
    setRows(newRows);
    setFile(file);
  };

  return (
    <div className="add">
      <div className="container">
        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema}
          onSubmit={submitForm}
        >
          {(formik) => (
            <FormFormik>
              <div className="information-details border-0">
                <div className="form-content">
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label htmlFor="name">{t("CUSTOMER")} *</label>
                        <FormItem
                          name="name"
                          hasFeedback={true}
                          showValidateSuccess={true}
                        >
                          <Input
                            defaultValue={""}
                            name="name"
                            id="name"
                            placeholder={t("CUSTOMER")}
                          />
                        </FormItem>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label htmlFor="phone">{t("PHONE")} *</label>
                        <FormItem
                          name="phone"
                          hasFeedback={true}
                          showValidateSuccess={true}
                        >
                          <Input
                            name="phone"
                            id="phone"
                            placeholder={t("PHONE")}
                          />
                        </FormItem>
                      </div>
                    </div>

                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label htmlFor="tax">{t("TAX_NUMBER")} *</label>
                        <FormItem
                          name="tax"
                          hasFeedback={true}
                          showValidateSuccess={true}
                        >
                          <Input
                            name="tax"
                            id="tax"
                            placeholder={t("TAX_NUMBER")}
                          />
                        </FormItem>
                      </div>
                    </div>

                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label htmlFor="address">{t("ADDRESS")} *</label>
                        <FormItem
                          name="address"
                          hasFeedback={true}
                          showValidateSuccess={true}
                        >
                          <Input
                            name="address"
                            id="address"
                            placeholder={t("ADDRESS")}
                          />
                        </FormItem>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="information-details info-print border-0 pt-0">
                <div className="form-content text-center">
                  <div className="content mx-auto w-50">
                    <h3>
                      برجاء استعمال هذا الملف اذا ارادت المبيعات الخارجية{" "}
                    </h3>
                    <Link
                      type="button"
                      target="_blank"
                      className="btn"
                      to={ProductFile}
                      download
                    >
                      {t("DOWNLOAD")}
                    </Link>
                  </div>
                  <div className="row">
                    <div className="col-md-4 col-12">
                      <UploadFile
                        accept=".xlsx"
                        action="excel"
                        Import={ImportFile}
                      />
                    </div>
                    <div className="col-md-4 col-12">
                      <button
                        type="button"
                        className="btn add_product"
                        onClick={() => setOpen(true)}
                      >
                        {t("ADD")} {t("PRODUCT")}
                      </button>
                    </div>
                    <div className="col-md-4 col-12 column">
                      <div className="form-group">
                        <Select
                          mode="multiple"
                          style={{ width: "100%" }}
                          onChange={handleChange}
                          allowClear
                          name="productsID"
                          placeholder={t("PRODUCTS")}
                        >
                          {products.map((index, key) => {
                            return (
                              <Option key={key} value={index.id}>
                                {index.title}
                              </Option>
                            );
                          })}
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="information-details border-0 pt-0">
                <div className="form-content row">
                  {rowsObject.length > 0 ||
                  rows.length > 0 ||
                  rowsEnterObject.length > 0 ? (
                    rowsObject.map((item, parent) => (
                      <div key={parent} className="col-md-3 col-12">
                        <div className="product-content">
                          <div className="title">{item.title}</div>
                          <div className="subtitle">{item.description}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Empty className="w-100" description="Not Found Products" />
                  )}

                  {rows.map((item, parent) => (
                    <div key={parent} className="col-md-3 col-12">
                      <div className="product-content">
                        {item.map((content, child) =>
                          child === 0 ? (
                            <div key={child} className="title">
                              {content}
                            </div>
                          ) : child === 1 ? (
                            <div key={child} className="subtitle">
                              {content}
                            </div>
                          ) : null
                        )}
                      </div>
                    </div>
                  ))}

                  {rowsEnterObject.map((item, key) => (
                    <div key={key} className="col-md-3 col-12">
                      <div className="product-content">
                        <div className="title">{item.title}</div>
                        <div className="subtitle">{item.descri}</div>
                      </div>
                    </div>
                  ))}
                  
                </div>
              </div>

              <div className="text-center">
                <SubmitButton
                  name="push"
                  className="btn"
                  loading={loading}
                  disabled={false}
                >
                  حفظ وطباعة
                </SubmitButton>
              </div>
            </FormFormik>
          )}
        </Formik>
        <AddProduct
          visible={open}
          manualProduct={manualProduct}
          product={handleManualChange}
          onCancel={() => setOpen(false)}
          title={`${t("ADD")} ${t("PRODUCT")}`}
        />
      </div>
    </div>
  );
};

export default Print;
