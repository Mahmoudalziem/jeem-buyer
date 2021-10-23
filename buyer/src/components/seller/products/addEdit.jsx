import React, { useState, useEffect } from "react";
import { useParams,useRouteMatch,withRouter } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {
  Form as FormFormik,
  InputNumber,
  SubmitButton,
  Select,
  FormItem,
  Input,
} from "formik-antd";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import ImageUploader from "react-images-upload";
import { validationImage } from "../../common/validationImage";
import { validationDesc } from "../../common/validationDesc";
import { Create, Update, Fetch, Delete } from "../../common/actions";
import * as Yup from "yup";

const { Option } = Select;

const AddEdit = (props) => {
  const [active, setActive] = useState(false);
  const [category, setCategory] = useState([]);
  const [carousel, setCarousel] = useState([]);
  const [tag, setTag] = useState([]);
  const [desc, setDesc] = useState(props.data ? props.data.descri : null);
  const [loading, isLoading] = useState(false);
  const [picture, setPicture] = useState([]);
  const [imagePhoto,setImagePhoto] = useState(props.data ? props.data.images : []);

  const Router = useRouteMatch();

  const {i18n,t} = useTranslation();
  
  const ROUTER_VIEW = Router.path !== "/dashboard/product/:slug" ? true : false;

  useEffect(() => {
    Fetch("carousel").then((res) => {
      if (res.status) {
        setCarousel(res.data);
      }
    });
    Fetch("tag").then((res) => {
      if (res.status) {
        setTag(res.data);
      }
    });

    Fetch("subcategory").then((res) => {
      if (res.status) {
        setCategory(res.data);
      }
    });
  }, []);

  const validateSchema = () =>
    Yup.object({
      title: Yup.string().max(60).required(t('TITLE_REQUIRED')),
      subtitle: Yup.string().max(200).required(t('SUBTITLE_REQUIRED')),
      price: Yup.number().required(t('PRICE_REQUIRED')).positive().integer(),
      discount: Yup.number().required(t('DISCOUNT_REQUIRED')).positive().integer(),
      count: Yup.number().required(t('COUNT_REQUIRED')).positive().integer(),
      m_neg: Yup.number().required(t('MAX_NEGOTIATE_REQUIRED')).positive().integer(),
      category: Yup.number().positive().integer().nullable(),
      carousel: Yup.number().positive().integer().nullable(),
      tag: Yup.number().positive().integer().nullable()
    });

  const onDrop = (initial, pictureDataURLs) => {
    setPicture(initial); // or pictureDataURLs
  };

  const params = useParams();

  const deleteImage = (image) => {
    let imageName = image.split("products/")[1];

    if (Delete("product", `${imageName}/image`)) {

      let filteredArray = imagePhoto.filter(item => item !== image)

      setImagePhoto(filteredArray);
    }
  };
  
  const submitForm = (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);

    if (validationDesc(desc) && validationImage(picture, props.edit)) {
      isLoading(true);

      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      formData.append("descri", desc);

      picture.forEach((element) => {
        formData.append("image[]", element);
      });

      if (props.edit) {
        const id = params.slug;

        if (Update("product", formData, id)) {
          isLoading(false);
          setPicture([]);
        }
      } else {
        if (Create("product", formData,'seller',true)) {
          resetForm({});
          setPicture([]);
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
          validationSchema={validateSchema}
          onSubmit={submitForm}
        >
          {(formik) => (
            <FormFormik>
              <div className="information-details">
                <div className="row">
                  <div className="col-md-3 col-12">
                    <div className="information">
                      <h3>{t('INFO_ADDEDIT')}</h3>
                      <ul>
                        <li>
                          {t('INFO_ADDEDIT1')} {t('PRODUCT')}.
                        </li>
                        <li>{t('INFO_ADDEDIT2')} {t('PRODUCT')}.</li>
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
                            autoFocus
                            placeholder={t('PLACEHOLDER_TITLE')}
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
                            id="subtitle"
                            className="form-control"
                            placeholder={t('PLACEHOLDER_SUBTITLE')}
                          />
                        </FormItem>
                      </div>

                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-6 col-12">
                            <div className="form-group">
                              <label htmlFor="price">{t('product.price')} *</label>

                              <FormItem
                                name="price"
                                hasFeedback={true}
                                showValidateSuccess={true}
                              >
                                <InputNumber
                                  defaultValue={
                                    props.data ? props.data.price : null
                                  }
                                  name="price"
                                  id="price"
                                  placeholder={t('product.price')}
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
                              <label htmlFor="discount">{t('product.discount')} *</label>
                              <FormItem
                                name="discount"
                                hasFeedback={true}
                                showValidateSuccess={true}
                              >
                                <InputNumber
                                  defaultValue={
                                    props.data ? props.data.discount : null
                                  }
                                  name="discount"
                                  id="discount"
                                  placeholder={t('product.discount')}
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
                              <label htmlFor="count">{t('product.count')} *</label>
                              <FormItem
                                name="count"
                                hasFeedback={true}
                                showValidateSuccess={true}
                              >
                                <InputNumber
                                  defaultValue={
                                    props.data ? props.data.count : null
                                  }
                                  name="count"
                                  id="count"
                                  max={1000}
                                  placeholder={t('product.count')}
                                />
                              </FormItem>
                            </div>
                          </div>

                          <div className="col-md-6 col-12">
                            <div className="form-group">
                              <label htmlFor="m_neg">{t('product.max')} *</label>
                              <FormItem
                                name="m_neg"
                                hasFeedback={true}
                                showValidateSuccess={true}
                              >
                                <InputNumber
                                  defaultValue={
                                    props.data ? props.data.max_neg : null
                                  }
                                  name="m_neg"
                                  id="m_neg"
                                  min={0}
                                  max={100}
                                  placeholder={t('product.max')}
                                  formatter={(value) => `${value}%`}
                                  parser={(value) => value.replace("%", "")}
                                />
                              </FormItem>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-4 col-12">
                            <label htmlFor="category">{t('CATEGORIES')} *</label>
                            <Select
                              defaultValue={
                                props.edit && props.data.category_id != null
                                  ? props.data.category_id
                                  : null
                              }
                              name="category"
                              placeholder={t('CATEGORIES')}
                            >
                              {category.map((index, key) => {
                                return (
                                  <Option key={key} value={index.id}>
                                    {i18n.language === 'en' ? index.name_en : index.name_ar}
                                  </Option>
                                );
                              })}
                            </Select>
                          </div>

                          <div className="col-md-4 col-12">
                            <label htmlFor="carousel">{t('Carousel')} *</label>
                            <Select
                              defaultValue={
                                props.edit && props.data.carousel_id != null
                                  ? props.data.carousel_id
                                  : null
                              }
                              name="carousel"
                              placeholder={t('Carousel')}
                            >
                              {carousel.map((index, key) => {
                                return (
                                  <Option key={key} value={index.id}>
                                    {index.title}
                                  </Option>
                                );
                              })}
                            </Select>
                          </div>

                          <div className="col-md-4 col-12">
                            <label htmlFor="tag">{t('Tags')} *</label>
                            <Select
                              defaultValue={
                                props.edit && props.data.tag_id != null
                                  ? props.data.tag_id
                                  : null
                              }
                              name="tag"
                              placeholder={t('Tags')}
                            >
                              {tag.map((index, key) => {
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

                      <div className="descri_content">
                        <div
                          className="head"
                          onClick={() => setActive(!active)}
                        >
                          <span>{t('PRODUCT_DESCRIPTION')}</span>
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
                              data={props.data ? props.data.descri : ""}
                              onChange={(event, editor) => {
                                const dataEditor = editor.getData();
                                setDesc(dataEditor);
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
                          <div className="col-12 col-md-8">
                            <div className="image-container">
                              {ROUTER_VIEW ? (
                                <ImageUploader
                                  withIcon={true}
                                  withPreview={true}
                                  buttonText={t('CHOO_IMAGES')}
                                  onChange={onDrop}
                                  singleImage={false}
                                  imgExtension={[".jpg", ".png"]}
                                  maxFileSize={5242880}
                                />
                              ) : (
                                imagePhoto.map((image, key) => (
                                  <div className="image_view" key={key}>
                                    <img
                                      src={image}
                                      className="uploadPicture"
                                      alt="preview"
                                    />
                                  </div>
                                ))
                              )}
                            </div>
                          </div>

                          <div className="col-12 col-md-4">
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
                                    {imagePhoto.map((image, key) => (
                                      <div className="image_view" key={key}>
                                        <img
                                          src={image}
                                          className="uploadPicture"
                                          alt="preview"
                                        />
                                        <i
                                          className="mdi mdi-close-circle"
                                          onClick={() => deleteImage(image)}
                                        ></i>
                                      </div>
                                    ))}
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
                    {props.edit ? `${t('EDIT')} ${t('PRODUCT')}` : `${t('ADD')} ${t('PRODUCT')}`}
                  </SubmitButton>
                </div>
              ) : null}
            </FormFormik>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default withRouter(AddEdit);
