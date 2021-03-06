import React from "react";
import { Modal } from "antd";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { Form as FormFormik, Input, FormItem, InputNumber } from "formik-antd";

const Models = (props) => {

  const { t } = useTranslation();

  const initialValues = {
    title: "",
    description: "",
    price: "",
    discount: "",
    count: "",
  };

  const validationSchema = () =>
    Yup.object({
      title: Yup.string().max(60).required(t("TITLE_REQUIRED")),
      description: Yup.string().max(200).required(t("PRODUCT_DESCRIPTION")),
      price: Yup.number().required(t("PRICE_REQUIRED")).positive().integer(),
      discount: Yup.number()
        .required(t("DISCOUNT_REQUIRED"))
        .positive()
        .integer(),
      count: Yup.number().required(t("COUNT_REQUIRED")).positive().integer(),
    });

    const submitForm = (values, { setSubmitting, resetForm }) => {

      setSubmitting(false);
  
      resetForm({});
  
      let newProducts = [...props.manualProduct];
  
      newProducts.push(values);
  
      props.product(newProducts);
      
      setTimeout(() => {

        props.onCancel();

      }, 15);
  
    };


  return (
    <div className="modal-container d-none">
      <Modal
        title={props.title}
        visible={props.visible}
        onCancel={props.onCancel}
        width={700}
        okButtonProps={{
          htmlType: "submit",
          key: "submit",
          string: "Ok",
          form: "print-invoice",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitForm}
        >
          {(formik) => (
            <FormFormik id="print-invoice" className="invoice">
              <div className="information-details border-0">
                <div className="form-content">
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label htmlFor="title">{t("product.title")} *</label>

                        <FormItem
                          name="title"
                          hasFeedback={true}
                          showValidateSuccess={true}
                        >
                          <Input
                            name="title"
                            className="form-control"
                            id="title"
                            autoFocus
                            placeholder={t("PLACEHOLDER_TITLE")}
                          />
                        </FormItem>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label htmlFor="description">
                          {t("PRODUCT_DESCRIPTION")} *
                        </label>
                        <FormItem
                          name="description"
                          hasFeedback={true}
                          showValidateSuccess={true}
                        >
                          <Input
                            name="description"
                            id="description"
                            className="form-control"
                            placeholder={t("PRODUCT_DESCRIPTION")}
                          />
                        </FormItem>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-4 col-12">
                        <div className="form-group">
                          <label htmlFor="price">{t("product.price")} *</label>

                          <FormItem
                            name="price"
                            hasFeedback={true}
                            showValidateSuccess={true}
                          >
                            <InputNumber
                              name="price"
                              id="price"
                              placeholder={t("product.price")}
                              formatter={(value) =>
                                `SAR ${value}`.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                )
                              }
                              step="number"
                              parser={(value) =>
                                value.replace(/\SAR\s?|(,*)/g, "")
                              }
                            />
                          </FormItem>
                        </div>
                      </div>

                      <div className="col-md-4 col-12">
                        <div className="form-group">
                          <label htmlFor="discount">
                            {t("product.discount")} *
                          </label>
                          <FormItem
                            name="discount"
                            hasFeedback={true}
                            showValidateSuccess={true}
                          >
                            <InputNumber
                              name="discount"
                              id="discount"
                              placeholder={t("product.discount")}
                              formatter={(value) =>
                                `SAR ${value}`.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                )
                              }
                              step="number"
                              parser={(value) =>
                                value.replace(/\SAR\s?|(,*)/g, "")
                              }
                            />
                          </FormItem>
                        </div>
                      </div>

                      <div className="col-md-4 col-12">
                        <div className="form-group">
                          <label htmlFor="count">{t("product.count")} *</label>
                          <FormItem
                            name="count"
                            hasFeedback={true}
                            showValidateSuccess={true}
                          >
                            <InputNumber
                              name="count"
                              id="count"
                              max={1000}
                              placeholder={t("product.count")}
                            />
                          </FormItem>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FormFormik>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default Models;
