import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams,Link,withRouter } from "react-router-dom";
import { Formik } from "formik";
import { Input, Form, FormItem, SubmitButton } from "formik-antd";
import * as Yup from "yup";
import { Create } from "../common/actions";

const Login = (props) => {
  const { t } = useTranslation();
  const [loading, isLoading] = useState(false);
  const params = useParams();

  const initialValue = { email: ""};

  const validateSchema = () =>
    Yup.object({
      email: Yup.string().email(t('EMAIL_VALID')).min(5).required(t('EMAIL_REQUIRED')),
    });

  const submitForm = (values, { setSubmitting,resetForm }) => {

    setSubmitting(false);

    isLoading(true);

    Create("reset", values, params.type,true).then(res => {

      isLoading(false);

      if(res && res.status){

        resetForm({});
      }
    });

  };

  return (
    <Fragment>
      <div className="auth-container">
        <div className="col-md-5 mx-auto col-12">
          <div className="content">
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
                          name="email"
                          hasFeedback={true}
                          showValidateSuccess={true}
                        >
                          <Input
                            name="email"
                            autoFocus
                            placeholder={t("EMAIL")}
                            className="w-100"
                          />
                        </FormItem>
                      </div>

                      <SubmitButton
                        name="push"
                        className="btn text-center"
                        loading={loading}
                        disabled={false}
                      >
                        {t("SEND_LINK")}
                      </SubmitButton>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>

            <div className="footer">
              <div className="no-account">
                <p>{t("YOU_REMEMBER_PASSWORD")}</p>
                <Link to={`/login/${params.type}`}>{t("LOGIN")}</Link>
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
};

export default withRouter(Login);
