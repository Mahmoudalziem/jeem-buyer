import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { Input, FormItem, SubmitButton, Form } from "formik-antd";
import ImageUploading from "react-images-uploading";
import { updateInfo } from "./actions";
import { useDispatch } from "react-redux";

/// icons

import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const Settings = (props) => {

  const [loading, isLoading] = useState(false);
  const [images, setImages] = useState([]);

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { name, address, country,image, state, pincode, city, phone } = useSelector(
    (s) => s.buyer
  );


  const initialValues = {
    phone : phone,
    country: country,
    address: address,
    pincode: pincode,
    state: state,
    city: city
  };
  
  const validateSchema = () =>
    Yup.object({
      country: Yup.string().nullable(),
      address: Yup.string().nullable(),
      pincode: Yup.string().nullable(),
      state: Yup.string().nullable(),
      city: Yup.string().nullable(),
    });

  const submitForm = (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);

    isLoading(true);

    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      
      formData.append(key, values[key]);
    });

    if (images[0]) {
      formData.append("image", images[0].file);
    }

    updateInfo(formData).then((res) => {
      
      // resetForm({});

      setImages([]);

      isLoading(false);

      dispatch({
        type: "UPDATEINFO",
        payload: {
          country: res.data.country,
          city: res.data.city,
          pincode: res.data.pincode,
          state: res.data.state,
          image: res.data.image ? res.data.image : image,
          address: res.data.address,
        },
      });
    });
  };

  return (
    <Fragment>
      <section className="add">
        <div className="container">
          <div className="mx-auto">
            <div className="col-md-6 col-12 mx-auto">
              <ImageUploading
                multiple={false}
                value={images}
                onChange={onChange}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageUpdate,
                  onImageRemove,
                  dragProps,
                }) => (
                  <div className="upload__image-wrapper">
                    <PhotoCameraIcon onClick={onImageUpload} {...dragProps} />
                    {imageList.map((image, index) => (
                      <div key={index} className="image-item">
                        <img src={image.data_url} alt="" width="100" />
                        <div className="image-item__btn-wrapper">
                          <EditIcon onClick={() => onImageUpdate(index)} />
                          <DeleteIcon onClick={() => onImageRemove(index)} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ImageUploading>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validateSchema}
              onSubmit={submitForm}
            >
              {(formik) => (
                <Form>
                  <div className="setting-details border-0">
                    <div className="form-content">
                      <div className="form-group">
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
                                  defaultValue={name}
                                  name="name"
                                  id="name"
                                  placeholder={t("NAME")}
                                  disabled
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
                                  defaultValue={phone}
                                  name="phone"
                                  id="phone"
                                  placeholder={t("PHONE")}
                                  disabled
                                />
                              </FormItem>
                            </div>
                          </div>

                          <div className="col-md-6 col-12">
                            <div className="form-group">
                              <label htmlFor="country">{t("COUNTRY")} *</label>
                              <FormItem
                                name="country"
                                hasFeedback={true}
                                showValidateSuccess={true}
                              >
                                <Input
                                  name="country"
                                  id="country"
                                  placeholder={t("COUNTRY")}
                                />
                              </FormItem>
                            </div>
                          </div>

                          <div className="col-md-6 col-12">
                            <div className="form-group">
                              <label htmlFor="city">{t("CITY")} *</label>
                              <FormItem
                                name="city"
                                hasFeedback={true}
                                showValidateSuccess={true}
                              >
                                <Input
                                  name="city"
                                  id="city"
                                  placeholder={t("CITY")}
                                />
                              </FormItem>
                            </div>
                          </div>

                          <div className="col-md-6 col-12">
                            <div className="form-group">
                              <label htmlFor="state">{t("STATE")} *</label>
                              <FormItem
                                name="state"
                                hasFeedback={true}
                                showValidateSuccess={true}
                              >
                                <Input
                                  name="state"
                                  id="state"
                                  placeholder={t("STATE")}
                                />
                              </FormItem>
                            </div>
                          </div>

                          <div className="col-md-6 col-12">
                            <div className="form-group">
                              <label htmlFor="pincode">{t("PINCODE")} *</label>
                              <FormItem
                                name="pincode"
                                hasFeedback={true}
                                showValidateSuccess={true}
                              >
                                <Input
                                  name="pincode"
                                  id="pincode"
                                  placeholder={t("PINCODE")}
                                />
                              </FormItem>
                            </div>
                          </div>

                          <div className="col-12">
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

                      <div className="text-center">
                        <SubmitButton
                          name="push"
                          className="btn"
                          loading={loading}
                          disabled={false}
                        >
                          {t("UPDATE_SETTINGS")}
                        </SubmitButton>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Settings;
