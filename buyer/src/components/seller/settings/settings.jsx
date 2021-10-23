import React, { Fragment, useState } from "react";
import { Formik } from "formik";
import {useTranslation} from 'react-i18next'
import * as Yup from "yup";
import { Input, FormItem, SubmitButton, Form } from "formik-antd";
import { updatePassword } from "./actions";

const Settings = (props) => {
  const [loading, isLoading] = useState(false);

  const initialValues = { password: "", "confirm-password": "" };
  const {t} = useTranslation();

  const validateSchema = () =>
    Yup.object({
      password: Yup.string().min(8).required(t("PASSWORD_REQUIRED")),
      "confirm-password": Yup.string().required(t('PASSWORD_CONFIRM_REQUIRED')).oneOf(
        [Yup.ref("password"), null],
        t('PASSWORD_CONFIRM_VALID')
      )
    });

  const submitForm = (values, { setSubmitting, resetForm }) => {
    
    setSubmitting(false);

    isLoading(true);

    if (updatePassword(values)) {
        
      resetForm({});

      isLoading(false);
    }
  };
  return (
    <Fragment>
      <section className="add">
        <div className="container">
          <div className="mx-auto ">
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
                        <label htmlFor="password">{t('PASSWORD')} *</label>
                        <FormItem
                          name="password"
                          hasFeedback={true}
                          showValidateSuccess={true}
                        >
                          <Input
                            type="password"
                            name="password"
                            className="form-control"
                            id="password"
                            placeholder={t('PASSWORD')}
                          />
                        </FormItem>
                      </div>

                      <div className="form-group">
                        <label htmlFor="confirm">{t('CONFIRM_PASSWORD')} *</label>
                        <FormItem
                          name="confirm-password"
                          hasFeedback={true}
                          showValidateSuccess={true}
                        >
                          <Input
                            type="password"
                            name="confirm-password"
                            className="form-control"
                            id="confirm"
                            placeholder={t('CONFIRM_PASSWORD')}
                          />
                        </FormItem>
                      </div>

                      <div className="text-center">
                        <SubmitButton
                          name="push"
                          className="btn"
                          loading={loading}
                          disabled={false}
                        >
                          {t('CHANGE_PASSWORD')}
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
