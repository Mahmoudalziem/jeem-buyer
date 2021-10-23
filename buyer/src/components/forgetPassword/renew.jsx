import React, { Fragment, useEffect,useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useHistory,withRouter } from "react-router-dom";
import { Formik } from "formik";
import { Input, Form, FormItem, SubmitButton } from "formik-antd";
import * as Yup from "yup";
import { Create,Fetch } from "../common/actions";

const Login = (props) => {
  const { t } = useTranslation();
  const [loading, isLoading] = useState(false);
  const params = useParams();

  const history = useHistory();

  const initialValue = { password: "", "confirm-password": "" };

  const validateSchema = () =>
    Yup.object({
      password: Yup.string().min(8).required(t("PASSWORD_REQUIRED")),
      "confirm-password": Yup.string().required(t('PASSWORD_CONFIRM_REQUIRED')).oneOf(
        [Yup.ref("password"), null],
        t('PASSWORD_CONFIRM_VALID')
      ),
    });

  const submitForm = (values, { setSubmitting, resetForm }) => {

    setSubmitting(false);

    isLoading(true);

    resetForm({});

    Create(`renew/${params.token}`, values, params.type,true).then(res => {

      isLoading(false);

      if(res && res.status){

        history.push(`/login/${params.type}`);
      }
    })
  };

  useEffect(() => {
    Fetch(`renew/${params.token}`, params.type).then((res) => {

        if(!res.status){
  
          history.push(`/login/${params.type}`);
        }
  
      });
  }, []);

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

                      <SubmitButton
                        name="push"
                        className="btn text-center"
                        loading={loading}
                        disabled={false}
                      >
                        {t("CHANGE_PASSWORD")}
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
