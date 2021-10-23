import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useHistory,withRouter } from "react-router-dom";
import { Formik } from "formik";
import { Input, Form, FormItem, SubmitButton } from "formik-antd";
import {Button} from 'antd'
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import { InboxOutlined } from "@ant-design/icons";
import { Fetch, Create } from "../common/actions";

const ActiveAgain = () => {
  
  const [count, setCount] = useState(180);
  const [loadingPhone, isLoadingPhone] = useState(false);
  const timer = () => setCount(count - 1);

  const { t } = useTranslation();

  const params = useParams();
  
  const timeFormat = (time) => {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60);
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
  };

  const sendAgain = () => {
    isLoadingPhone(true);
    Fetch(`phone/${params.token}`,params.type).then(res => {
      if(res.status){
        isLoadingPhone(false);
        setCount(180);
      }
    })
  };

  useEffect(() => {
    if (count) {
      const id = setInterval(timer, 1000);
      return () => clearInterval(id);
    }
  }, [count]);

  return (
    count ? (
      <span className="time-counter">
        {timeFormat(count)}
      </span>
    ) : (
      <Button loading={loadingPhone} className="btn send" onClick={sendAgain}>
        {t('SEND')}
      </Button>
    )
  )
  
}
const Login = (props) => {
  const { t } = useTranslation();
  const [loading, isLoading] = useState(false);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    multiple: false,
    accept: [".pdf"],
  });

  const params = useParams();

  const history = useHistory();

  const initialValue =
    params.type === "seller" ? { email: "", phone: "" } : { phone: "" };

  const validateSchema = () =>
    params.type === "seller"
      ? Yup.object({
          email: Yup.string()
            .required(t("OTP_EMAIL_REQUIRED"))
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(6, "Must be exactly 6 digits")
            .max(6, "Must be exactly 6 digits"),
          phone: Yup.string()
            .required(t("OTP_PHONE_REQUIRED"))
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(6, "Must be exactly 6 digits")
            .max(6, "Must be exactly 6 digits"),
        })
      : Yup.object({
          phone: Yup.string()
            .required(t("OTP_PHONE_REQUIRED"))
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(6, "Must be exactly 6 digits")
            .max(6, "Must be exactly 6 digits"),
        });

  const submitForm = (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);

    isLoading(true);

    const formData = new FormData();

    if (params.type === "seller") {
      formData.append("file", acceptedFiles[0]);
    }

    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    Create(`active/${params.token}`, formData, params.type, true).then(
      (res) => {
        if (res.status) {
          resetForm({});

          isLoading(false);

          if (params.type === "buyer") {
            history.push("/profile");
          } else {
            history.push(`/login/${params.type}`);
          }
        }
      }
    );
  };



  useEffect(() => {
    Fetch(`active/${params.token}`, params.type).then((res) => {
      if (!res.status) {
        history.push(`/login/${params.type}`);
      }
    });

  }, []);

  return (
    <Fragment>
      <div className="auth-container">
        <div className="col-md-5 mx-auto col-12">
          <div className="content">
            <div className="header">
              <span>{t("ACTIVEACCOUNT")}</span>
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
                      {params.type === "seller" ? (
                        <div className="form-group">
                          <FormItem
                            name="email"
                            hasFeedback={true}
                            showValidateSuccess={true}
                          >
                            <Input
                              name="email"
                              minLength={6}
                              maxLength={6}
                              autoFocus
                              placeholder={t("EMAIL_ACTIVATE_CODE")}
                              className="w-100"
                            />
                          </FormItem>
                        </div>
                      ) : null}

                      <div className="form-group">
                        <FormItem
                          name="phone"
                          hasFeedback={true}
                          showValidateSuccess={true}
                        >
                          <Input
                            name="phone"
                            minLength={6}
                            maxLength={6}
                            placeholder={t("ENTER_PHONE_ACTIVATE_CODE")}
                            className="w-100"
                          />
                          <ActiveAgain />
                        </FormItem>
                      </div>

                      {params.type === "seller" ? (
                        <div className="form-group">
                          <div {...getRootProps({ className: "dropzone" })}>
                            <input {...getInputProps()} />

                            {acceptedFiles[0] ? (
                              <p>{acceptedFiles[0].name}</p>
                            ) : (
                              <>
                                <p className="ant-upload-drag-icon">
                                  <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                  Click or drag file to this area to upload
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      ) : null}

                      <SubmitButton
                        name="push"
                        className="btn text-center"
                        loading={loading}
                        disabled={false}
                      >
                        {t("ACTIVEACCOUNT")}
                      </SubmitButton>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(Login);
