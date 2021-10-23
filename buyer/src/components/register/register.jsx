import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useHistory,Link,withRouter } from "react-router-dom";
import { RegisterForm } from "../common/actions";
import { Formik } from "formik";
import { Tooltip } from 'antd';

import {
  Input,
  Form,
  FormItem,
  Select,
  SubmitButton,
} from "formik-antd";
import * as Yup from "yup";
import { Fetch } from "../common/actions";
import Spinner from "../layouts/spinner/spinner";
import InfoIcon from '@material-ui/icons/Info';

const { Option } = Select;

const Register = (props) => {
  const [loadings, isLoading] = useState(false);
  const [category, setCategory] = useState();

  const [loading, setLoading] = useState(false);

  const { t, i18n } = useTranslation();

  const params = useParams();

  const history = useHistory();

  const phoneRegExp =
    /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;

  const initialValue = {
    name: "",
    email: "",
    password: "",
    phone: "",
    "confirm-password": "",
  };

  const validateSchema = () =>
    Yup.object({
      name: Yup.string().required(t("NAME_REQUIRED")),
      email: Yup.string()
        .email(t("EMAIL_VALID"))
        .min(5)
        .required(t("EMAIL_REQUIRED")),
      phone: Yup.string()
        .required(t("PHONE_REQUIRED"))
        .matches(phoneRegExp, "Phone number is not valid"),
      city:
        params.type === "seller"
          ? Yup.string().required(t("CITY_REQUIRED"))
          : null,
      password: Yup.string().min(8).required(t("PASSWORD_REQUIRED")),
      category:
        params.type === "seller"
          ? Yup.number().required("CATEGORY_REQUIRED")
          : null,
      "confirm-password": Yup.string()
        .required(t("PASSWORD_CONFIRM_REQUIRED"))
        .oneOf([Yup.ref("password"), null], t("PASSWORD_CONFIRM_VALID")),
    });

  const submitForm = (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);

    isLoading(true);

    RegisterForm(values, params.type).then((res) => {
      if (res && res.status) {
        resetForm({});

        isLoading(false);

        history.push(`/active/${params.type}/${res.data.token}`);
      }

      isLoading(false);
    });
  };

  useEffect(() => {
    Fetch("category", "buyer").then((res) => {
      if (res.status) {
        setCategory(res.data);
        setLoading(true);
      } else {
        console.log("error");
      }
    });
  }, []);

  if (loading) {
    return (
      <Fragment>
        <div className="auth-container">
          <div className="col-lg-6 col-xl-5 col-md-7 mx-auto col-12">
            <div className="content">
              <div className="header">
                <span>
                  {t("IAM")} {"  "}
                </span>
                <span>
                  {params.type === "buyer" ? t("CUSTOMER") : t("SELLER")}
                </span>
              </div>
              <Formik
                initialValues={initialValue}
                onSubmit={submitForm}
                validationSchema={validateSchema}
              >
                {(formik) => (
                  <div className="container">
                    <Form className="form-login">
                      <div className="form-content">
                        <div className="form-group">
                          <FormItem
                            name="name"
                            hasFeedback={true}
                            showValidateSuccess={true}
                          >
                            <Input
                              name="name"
                              autoFocus
                              placeholder={
                                params.type === "buyer"
                                  ? t("NAME")
                                  : t("COMPANY")
                              }
                              className="w-100"
                            />
                          </FormItem>
                        </div>

                        <div className="form-group phone">
                          <FormItem
                            name="phone"
                            hasFeedback={true}
                            showValidateSuccess={true}
                          >
                            <Tooltip placement={i18n.language === 'ar' ? 'left' : 'right'} title={t('OTO_PHONE_INFO')}>
                              <InfoIcon />
                            </Tooltip>
                            <Input
                              name="phone"
                              placeholder={t("PHONE_NUMBER")}
                              className="w-100"
                            />
                          </FormItem>
                        </div>

                        <div className="form-group">
                          <FormItem
                            name="email"
                            hasFeedback={true}
                            showValidateSuccess={true}
                          >
                            <Input
                              name="email"
                              placeholder={t("EMAIL")}
                              className="w-100"
                            />
                          </FormItem>
                        </div>

                        <div className="form-group">
                          <FormItem
                            name="password"
                            hasFeedback={true}
                            showValidateSuccess={true}
                          >
                            <Input.Password
                              name="password"
                              placeholder={t("PASSWORD")}
                              className="w-100"
                            />
                          </FormItem>
                        </div>

                        <div className="form-group">
                          <FormItem
                            name="confirm-password"
                            hasFeedback={true}
                            showValidateSuccess={true}
                          >
                            <Input.Password
                              name="confirm-password"
                              placeholder={t("CONFIRM_PASSWORD")}
                              className="w-100"
                            />
                          </FormItem>
                        </div>

                        {params.type === "seller" ? (
                          <Fragment>
                            <div className="form-group">
                              <FormItem
                                name="city"
                                hasFeedback={true}
                                showValidateSuccess={true}
                              >
                                <Select name="city" placeholder={t("CITY")}>
                                  <Option value="madina">{t("MADINA")}</Option>
                                  <Option value="riyadh">{t("RIYADH")}</Option>
                                  <Option value="jeddah">{t("JEDDAH")}</Option>
                                  <Option value="tammam">{t("TAMMAM")}</Option>
                                </Select>
                              </FormItem>
                            </div>
                            <div className="form-group">
                              <FormItem
                                name="category"
                                hasFeedback={true}
                                showValidateSuccess={true}
                              >
                                <Select
                                  name="category"
                                  placeholder={t("CATEGORIES")}
                                >
                                  {category.map((index, key) => (
                                    <Option key={key} value={index.id}>
                                      {i18n.language === "en"
                                        ? index.name_en
                                        : index.name_ar}
                                    </Option>
                                  ))}
                                </Select>
                              </FormItem>
                            </div>
                          </Fragment>
                        ) : null}
                        <SubmitButton
                          name="push"
                          className="btn text-center"
                          loading={loadings}
                          disabled={false}
                        >
                          {t("LOGIN")}
                        </SubmitButton>
                      </div>
                    </Form>
                  </div>
                )}
              </Formik>

              <div className="footer">
                <div className="no-account">
                  <p>{t("ALREADY_HAVE_AN_ACCOUNT")}</p>
                  <Link to={`/login/${params.type}`}>{t("LOGIN")}</Link>
                </div>
                <div className="no-account">
                  <p>{t("REGISTER_AS")}</p>
                  <Link
                    to={`/register/${
                      params.type === "buyer" ? "seller" : "buyer"
                    }`}
                  >
                    {params.type === "buyer"
                      ? t("SELLER_NON_AL")
                      : t("CUSTOMER")}
                  </Link>
                </div>
                <Link to="/" className="go-home">
                  {t("GO_HOME_PAGE")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return <Spinner width="100%" height="100vh" />;
  }
};

export default withRouter(Register);
