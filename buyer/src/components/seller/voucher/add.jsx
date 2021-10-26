import React, { useState } from "react";
import {
  Form as FormFormik,
  SubmitButton,
  FormItem,
  Input,
  InputNumber,
} from "formik-antd";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Create } from "../../common/actions";
import * as Yup from "yup";

const Print = (props) => {
  const [loading, isLoading] = useState(false);
  const { t } = useTranslation();

  const initialValues = {
    name: "",
    price: "",
    check: "",
    for: "",
    receiver: "",
  };
 
  const validateSchema = () =>
    Yup.object({
      name: Yup.string().required(t("NAME_REQUIRED")),
      price: Yup.number().required(t("PRICE_REQUIRED")).positive().integer(),
      check: Yup.number().required(t("CHECK_REQUIRED")),
      for: Yup.string().required(t("FOR_REQUIRED")),
      receiver: Yup.string().required(t("RECEIVER_REQUIRED")),
    });

  const submitForm = (values, { setSubmitting, resetForm }) => {

    setSubmitting(false);

    console.log(values);

    // Create("manual_products", values, "seller", true).then((res) => {
    //   if (res.status) {
    //     isLoading(false);

    //     resetForm({});
    //   }
    // });
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
                        <label htmlFor="name">{t("NAME")} *</label>
                        <FormItem
                          name="name"
                          hasFeedback={true}
                          showValidateSuccess={true}
                        >
                          <Input
                            defaultValue={""}
                            name="name"
                            id="name"
                            placeholder={t("NAME")}
                          />
                        </FormItem>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
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

                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label htmlFor="check">{t("CHECK_NUMBER")} *</label>
                        <FormItem
                          name="check"
                          hasFeedback={true}
                          showValidateSuccess={true}
                        >
                          <Input
                            name="check"
                            id="check"
                            placeholder={t("CHECK_NUMBER")}
                          />
                        </FormItem>
                      </div>
                    </div>


                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label htmlFor="receiver">{t("RECEIVER")} *</label>
                        <FormItem
                          name="receiver"
                          hasFeedback={true}
                          showValidateSuccess={true}
                        >
                          <Input
                            name="receiver"
                            id="receiver"
                            placeholder={t("RECEIVER")}
                          />
                        </FormItem>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="for">{t("THAT_FOR")} *</label>
                        <FormItem
                          name="for"
                          hasFeedback={true}
                          showValidateSuccess={true}
                        >
                          <Input
                            name="for"
                            id="for"
                            placeholder={t("THAT_FOR")}
                          />
                        </FormItem>
                      </div>
                    </div>

                 
                  </div>
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
      </div>
    </div>
  );
};

export default Print;
