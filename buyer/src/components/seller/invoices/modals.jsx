import React, { useState } from "react";
import { Modal } from "antd";
import * as Yup from "yup";
import { Create } from "../../common/actions";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import {
  InputNumber,
  Form as FormFormik,
  Input,
  SubmitButton,
  FormItem,
} from "formik-antd";

const Models = (props) => {
  const [loading, isLoading] = useState(false);
  const { t } = useTranslation();

  const initialValues = {
    title: "",
    subtitle: "",
    price: "",
    discount: "",
    count : ""
  };

  const validateSchema = () =>
    Yup.object({
      title: Yup.string().max(60).required(t("TITLE_REQUIRED")),
      subtitle: Yup.string().max(200).required(t("SUBTITLE_REQUIRED")),
      price: Yup.number().required(t("PRICE_REQUIRED")).positive().integer(),
      discount: Yup.number()
        .required(t("DISCOUNT_REQUIRED"))
        .positive()
        .integer(),
      count: Yup.number().required(t("COUNT_REQUIRED")).positive().integer(),
    });

  const submitForm = (values, { setSubmitting, resetForm }) => {
    
    isLoading(true);

    setSubmitting(false);

    props.Proudct(values);

    props.Proudct(values);

    resetForm({});

    setTimeout(() => {

      props.onCancel(false);

    }, 15);
  };

  return (
    <div className="modal-container d-none">
      <Modal
        title={props.title}
        visible={props.visible}
        confirmLoading={loading}
        onCancel={props.onCancel}
        width={700}
        okButtonProps={{
          htmlType: "submit",
          key: "submit",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema}
          onSubmit={submitForm}
          render={(formik) => (
            <FormFormik>
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
                            type="text"
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
                        <label htmlFor="subtitle">
                          {t("PRODUCT_DESCRIPTION")} *
                        </label>
                        <FormItem
                          name="descri"
                          hasFeedback={true}
                          showValidateSuccess={true}
                        >
                          <Input
                            type="text"
                            name="descri"
                            id="descri"
                            className="form-control"
                            placeholder={t("PLACEHOLDER_SUBTITLE")}
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
              
              {/* <div className="text-center">
                <SubmitButton
                  name="push"
                  className="btn"
                  loading={loading}
                  disabled={false}
                >
                  حفظ وطباعة
                </SubmitButton>
              </div> */}

            </FormFormik>
          )}
        />
      </Modal>
    </div>
  );
};

export default Models;
