import React, { useState } from "react";
import { useParams,withRouter } from "react-router-dom";
import { Formik } from "formik";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Form, SubmitButton } from "formik-antd";
import { validationImage } from "../../common/validationImage";
import { validationDesc } from "../../common/validationDesc";
import ImageUploader from "react-images-upload";
import { useTranslation } from "react-i18next";
import { Create, Update } from "../../common/actions";
import { useRouteMatch } from "react-router-dom";

import * as Yup from "yup";

const AddEdit = (props) => {
  const [active, setActive] = useState(false);
  const [loading, isLoading] = useState(false);
  const [content, setContent] = useState(
    props.data ? props.data.content : null
  );
  const { t } = useTranslation();
  const [picture, setPicture] = useState([]);

  const Router = useRouteMatch();

  const ROUTER_VIEW = Router.path !== "/dashboard/post/:slug" ? true : false;

  const validationSchema = () => Yup.object({});

  const onDrop = (initial, pictureDataURLs) => {
    setPicture(initial); // or pictureDataURLs
  };

  const params = useParams();

  const submitForm = (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);

    if (validationDesc(content) && validationImage(picture, props.edit)) {
      
      isLoading(true);

      const formData = new FormData();

      formData.append("content", content);

      formData.append("image", picture[0]);

      if (props.edit) {
        const id = params.slug;

        if (Update("post", formData, id)) {
          resetForm({});

          isLoading(false);
        }
      } else {
        if (Create("post", formData,'seller',true)) {
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
                            {t('INFO_ADDEDIT1')} {t('Post')}.
                          </li>
                          <li>{t('INFO_ADDEDIT2')} {t('Post')}.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-md-9 col-12">
                    <div className="form-content">
                      <div className="descri_content">
                        <div
                          className="head"
                          onClick={() => setActive(!active)}
                        >
                          <span>{t('POST_CONTENT')}</span>
                          <span>
                            <i className="fa fa-angle-down icon-arrow-down"></i>
                          </span>
                        </div>

                        <div className={`content ${active ? "active" : ""}`}>
                          <div className="container_content">
                            <CKEditor
                              id="description"
                              editor={ClassicEditor}
                              config={{
                                toolbar: ["Bold", "Italic", "Undo", "Redo"],
                              }}
                              data={props.data ? props.data.content : ""}
                              onChange={(event, editor) => {
                                const dataEditor = editor.getData();
                                setContent(dataEditor);
                                if (!isLoading) {
                                  editor.setData("");
                                }
                              }}
                            />
                          </div>
                        </div>
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
                    {props.edit ? `${t('EDIT')} ${t('Post')}` : `${t('ADD')} ${t('Post')}`}
                  </SubmitButton>
                </div>
              ) : null}
            </Form>
          )}
        </Formik>

        <div className="comment-content">
          {ROUTER_VIEW ? null : <div className="title">Comments :</div>}
        {ROUTER_VIEW
        ? null
        : props.comments.map((comment,key) => (
            <div className="comment-container" key={key}>
              <div className="buyer">
                <div>{comment.buyer.name}</div>
                <div>{comment.like ? "like" : null}</div>
              </div>
              <div className="comment">{comment.comment}</div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default withRouter(AddEdit);
