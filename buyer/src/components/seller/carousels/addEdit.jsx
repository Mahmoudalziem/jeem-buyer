import React, { useState } from "react";
import {useParams,useRouteMatch,withRouter} from 'react-router-dom'
import {Form, Input, FormItem,SubmitButton} from 'formik-antd'
import { Formik} from "formik";
import ImageUploader from "react-images-upload";
import {Create,Update} from '../../common/actions'
import {validationImage} from '../../common/validationImage'
import { useTranslation } from "react-i18next";

import * as Yup from "yup";

const AddEdit = (props) => {
  
  const [loading, isLoading] = useState(false);
  const [picture, setPicture] = useState([]);
  const {t} = useTranslation();

  const validationSchema = () =>
    Yup.object({
      title: Yup.string().max(60).required(t('TITLE_REQUIRED')),
      subtitle: Yup.string().max(200).required(t('SUBTITLE_REQUIRED')),
    });

  const onDrop = (initial, pictureDataURLs) => {

    setPicture(initial); // or pictureDataURLs
  };

  const params = useParams();


  const Router = useRouteMatch();

  const ROUTER_VIEW = Router.path !== "/dashboard/carousel/:slug" ? true : false;

  const submitForm = (values, { setSubmitting,resetForm }) => {

    setSubmitting(false);

    if (validationImage(picture, props.edit)) {

      isLoading(true);

      const formData = new FormData();

      Object.keys(values).forEach((key) => {

        formData.append(key, values[key]);

      }); 

      formData.append("image", picture[0]);

      if (props.edit) {
        
        const id = params.slug;

        if (Update("carousel", formData, id)) {

          resetForm({});

          isLoading(false);
        }
      } else {

        if (Create("carousel", formData,'seller',true)) {

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
                      <h3>{t('INFO_ADDEDIT')}</h3>
                      <ul>
                        <li>
                            {t('INFO_ADDEDIT1')} {t('Carousel')}.
                          </li>
                          <li>{t('INFO_ADDEDIT2')} {t('Carousel')}.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-md-9 col-12">
                    <div className="form-content">
                      <div className="form-group">
                        <label htmlFor="title">{t('product.title')} *</label>
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
                          placeholder={t('PLACEHOLDER_TITLE')}
                          autoFocus
                        />
                        </FormItem>
                      </div>

                      <div className="form-group">
                      <label htmlFor="subtitle">{t('product.subtitle')} *</label>
                        <FormItem
                        name="subtitle"
                        hasFeedback={true}
                        showValidateSuccess={true}
                        >
                          <Input
                          type="text"
                          name="subtitle"
                          className="form-control"
                          id="title"
                          placeholder={t('PLACEHOLDER_SUBTITLE')}
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
                    <h3>{t('BRANDING')}</h3>
                      <ul>
                        <li>
                        {t('BRANDING_DESC')}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-md-9 col-12">
                    <div className="branding-right">
                      <div className="branding-image">
                        <div className="row border-0">
                          <div className="col-md-8 col-lg-9">
                            <div className="image-container">
                            {ROUTER_VIEW ? (
                                <ImageUploader
                                  withIcon={true}
                                  withPreview={true}
                                  buttonText={t('CHOO_IMAGES')}
                                  onChange={onDrop}
                                  singleImage={true}
                                  imgExtension={[".jpg", ".png"]}
                                  maxFileSize={5242880}
                                />
                              ) : (
                                <img
                                  src={props.data.image}
                                  className="uploadPicture"
                                  alt="preview"
                                />
                              )}
                            </div>
                          </div>

                          <div className="col-md-4 col-lg-3">
                            <div className="image-details">
                              <div className="half_opaque">
                                <span className="text-center">
                                {t('RECOMM_FORMAT')}
                                </span>

                                <ul>
                                  <li>JPG, PNG</li>
                                  <li>960x540px</li>
                                </ul>
                              </div>

                              {ROUTER_VIEW ? (
                                props.data ? (
                                  <div className="uploadPictureContainer">
                                    <img
                                      src={props.data.image}
                                      className="uploadPicture"
                                      alt="preview"
                                    />
                                  </div>
                                ) : null
                              ) : null}

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {ROUTER_VIEW ? (
                <div className="text-center">
                  <SubmitButton
                    name="push"
                    className="btn"
                    loading={loading}
                    disabled={false}
                  >
                    {props.edit ? `${t('EDIT')} ${t('Carousel')}` : `${t('ADD')} ${t('Carousel')}`}
                  </SubmitButton>
                </div>
              ) : null}

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default withRouter(AddEdit);
