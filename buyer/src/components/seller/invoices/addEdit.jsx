import React, { useState } from "react";
import { useParams,withRouter } from "react-router-dom";
import { Formik } from "formik";
import { Form, FormItem, SubmitButton, Input, InputNumber } from "formik-antd";
import ImageUploader from "react-images-upload";
import { validationImage } from "../../common/validationImage";
import { Create, Update } from "../../common/actions";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

const AddEdit = (props) => {
  const [loading, isLoading] = useState(false);
  const [picture, setPicture] = useState([]);
  const { t } = useTranslation();

  const validationSchema = () =>
    Yup.object({
      name: Yup.string().max(60).required(t("NAME_REQUIRED")),
      charge: Yup.number().required(t('CHARGE_REQUIRED')).positive().integer(),
    });

  const onDrop = (initial, pictureDataURLs) => {
    setPicture(initial); // or pictureDataURLs
  };

  const params = useParams();

  const submitForm = (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);

    if (validationImage(picture, props.edit)) {
      isLoading(true);

      const formData = new FormData();

      formData.append("name", values.name);

      formData.append("charge", values.charge);

      formData.append("image", picture[0]);

      if (props.edit) {
        const id = params.slug;

        if (Update("invoice", formData, id)) {
          resetForm({});

          isLoading(false);
        }
      } else {
        if (Create("invoice", formData, "seller", true)) {
          resetForm({});

          isLoading(false);
        }
      }
    }
  };

  return (
    <div className="add">
      <div className="container">
        <Formik
          initialValues={props.initialValues}
          validationSchema={validationSchema}
          onSubmit={submitForm}
        >
          {(formik) => (
            <Form>
              <div className="information-details">
                <div className="row">
                  <div className="col-md-3 col-12">
                    <div className="information">
                      <h3>{t("INFO_ADDEDIT")}</h3>
                      <ul>
                        <li>
                          {t("INFO_ADDEDIT1")} {t("Invoice")}.
                        </li>
                        <li>
                          {t("INFO_ADDEDIT2")} {t("Invoice")}.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-md-9 col-12">
                    <div className="form-content">
                      <div className="form-group">
                        <label htmlFor="title">{t("product.title")} *</label>
                        <FormItem
                          name="name"
                          hasFeedback={true}
                          showValidateSuccess={true}
                        >
                          <Input
                            type="text"
                            name="name"
                            className="form-control"
                            id="name"
                            placeholder={t("PLACEHOLDER_TITLE")}
                          />
                        </FormItem>
                      </div>

                      <div className="form-group">
                        <label htmlFor="charge">{t("product.charge")} *</label>
                        <FormItem
                          name="charge"
                          hasFeedback={true}
                          showValidateSuccess={true}
                        >
                          <InputNumber
                            name="charge"
                            id="charge"
                            placeholder={`${t("product.charge")} (Optional)`}
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
                  </div>
                </div>
              </div>

              <div className="information-branding">
                <div className="row border-0">
                  <div className="col-md-3 col-12">
                    <div className="information">
                      <h3>{t("BRANDING")}</h3>
                      <ul>
                        <li>{t("BRANDING_DESC")}</li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-md-9 col-12">
                    <div className="branding-right">
                      <div className="branding-image">
                        <div className="row border-0">
                          <div className="col-md-8 col-lg-9">
                            <div className="image-container">
                              <ImageUploader
                                withIcon={true}
                                withPreview={true}
                                buttonText={t("CHOO_IMAGES")}
                                onChange={onDrop}
                                singleImage={true}
                                imgExtension={[".jpg", ".png"]}
                                maxFileSize={5242880}
                              />
                            </div>
                          </div>

                          <div className="col-md-4 col-lg-3">
                            <div className="image-details">
                              <div className="half_opaque">
                                <span className="text-center">
                                  {t("RECOMM_FORMAT")}
                                </span>

                                <ul>
                                  <li>JPG, PNG</li>
                                  <li>960x540px</li>
                                </ul>
                              </div>

                              {props.data ? (
                                <div className="uploadPictureContainer">
                                  <img
                                    src={props.data.image}
                                    className="uploadPicture"
                                    alt="preview"
                                  />
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
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
                  {props.edit
                    ? `${t("EDIT")} ${t("Invoice")}`
                    : `${t("ADD")} ${t("Invoice")}`}
                </SubmitButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default withRouter(AddEdit);
