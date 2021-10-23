import React, { Fragment,useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams,useHistory,Link,withRouter } from "react-router-dom";
import { Formik } from "formik";
import { Input, Form, FormItem, SubmitButton } from "formik-antd";
import { LoginForm } from "../common/actions";
import {useDispatch} from 'react-redux'
import * as Yup from "yup";
import {storeMany} from '../../lib/local-storage'

const Login = (props) => {

  const [loading, isLoading] = useState(false);
  
  const { t } = useTranslation();

  const params = useParams();

  const history = useHistory();

  const dispatch = useDispatch();

  const initialValue = { email: "", password: "" };

  const validateSchema = () =>
    Yup.object({
      email: Yup.string().email(t('EMAIL_VALID')).min(5).required(t('EMAIL_REQUIRED')),
      password: Yup.string().min(8).required(t("PASSWORD_REQUIRED")),
    });

  const submitForm = (values, { setSubmitting }) => {

    setSubmitting(false);

    isLoading(true);

    LoginForm(values,params.type).then((res) => {

      if (res.status) {
        dispatch({    
          type : 'LOGIN',
          payload: {
            token : res.data.token,
            role: res.data.role,
            status: res.status
          }
        });

        storeMany([ 
          {
            key : 'token',
            value : res.data.token
          },
          {
            key : 'role',
            value : res.data.role
          }
        ]);

        isLoading(false);

        return (params.type === 'buyer') ? props.history.push('/profile') : props.history.push('/dashboard');

      }else{

        isLoading(false);

        if(res.data){
          return history.push(`/active/${params.type}/${res.data.token}`);
        }
      } 
    });
  };

  return (
    <Fragment>
      <div className="auth-container">
        <div className="col-xl-5 col-lg-6  col-md-7 mx-auto col-12">
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

                      <SubmitButton
                        name="push"
                        className="btn text-center"
                        loading={loading}
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
                <p>{t("DONT_HAVE_ACCOUNT")}</p>
                <Link to={`/register/${params.type}`}>{t("REGISTER")}</Link>
              </div>
              <div className="no-account">
                <p>{t("FORGOT_PASSWORD")}</p>
                <Link to={`/reset-password/${params.type}`}>{t("RESET_PASSWORD")}</Link>
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
