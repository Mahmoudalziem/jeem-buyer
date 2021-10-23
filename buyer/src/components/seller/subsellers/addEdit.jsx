import React, { useState, useEffect } from "react";
import { useParams,useRouteMatch,withRouter } from "react-router-dom";
import { Formik } from "formik";
import Spinner from "../../layouts/spinner/spinner";
import ToastHandling from "../../common/toastify";
import {useTranslation} from 'react-i18next'
import { Checkbox } from "antd";
import { Form, Input, FormItem, SubmitButton } from "formik-antd";
import { permissions } from "./actions";
import { Create, Update } from "../../common/actions";
import * as Yup from "yup";

const AddEdit = (props) => {
  const [permission, setPermission] = useState([]);
  const [selectPermission, setSelectPermission] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  const {t,i18n} = useTranslation();

  useEffect(() => {
    permissions().then((res) => setPermission(res));

    setLoading(false);
  }, []);

  const onChange = (event) => {

    setSelectPermission(event);
    
  };

  let validationPassword = props.edit
    ? Yup.string().min(8).nullable()
    : Yup.string().min(8).required(t('PASSWORD_REQUIRED'));

  const validationSchema = () =>
    Yup.object({
      name: Yup.string().max(60).required(t('NAME_REQUIRED')),
      email: Yup.string().email().required(t('EMAIL_REQUIRED')),
      password: validationPassword,
    });

  const params = useParams();

  const Router = useRouteMatch();

  const ROUTER_VIEW =
    Router.path !== "/dashboard/subseller/:slug" ? true : false;

    const handlingChecked = (values) => {

      if(values.length > 0){

        let arrayChecked = [];

        for(let x  of values){

          arrayChecked.push(x.id)

          selectPermission.push(x.id)
        }

        return arrayChecked;
      }

    }

  const submitForm = (values, { setSubmitting, resetForm }) => {

    setSubmitting(false);

    if (selectPermission.length === 0) {

      ToastHandling("error", "Please select at least one permission");

      return false;

    } else {
      setActive(true);

      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      Object.keys(selectPermission).forEach((key) => {
        formData.append("permission[]", selectPermission[key]);
      });

      if (props.edit) {
        const id = params.slug;

        if (Update("subseller", formData, id)) {
          setActive(false);
        }
      } else {
        if (Create("subseller", formData,'seller',true)) {
          resetForm({});

          setActive(false);
        }
      }
    }
  };

  if (!loading) {
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
                <div className="information-details border-0">
                  <div className="row">
                    <div className="col-md-3 col-12">
                      <div className="information">
                        <h3>{t('INFO_ADDEDIT')}</h3>
                        <ul>
                          <li>
                            {t('INFO_ADDEDIT1')} {t('subseller')} , {t('subseller.email')}.
                          </li>
                          <li>{t('INFO_ADDEDIT2')} {t('subseller')}.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="col-md-9 col-12">
                      <div className="form-content">
                        <div className="form-group">
                          <label htmlFor="name">{t('subseller.name')} *</label>
                          <FormItem
                            name="name"
                            hasFeedback={true}
                            showValidateSuccess={true}
                          >
                            <Input
                              type="text"
                              name="name"
                              className="form-control"
                              id="name"
                              placeholder={t('PLACEHOLDER_NAME')}
                              autoFocus
                            />
                          </FormItem>
                        </div>

                        <div className="form-group">
                          <label htmlFor="email">{t('subseller.email')} *</label>
                          <FormItem
                            name="email"
                            hasFeedback={true}
                            showValidateSuccess={true}
                          >
                            <Input
                              type="email"
                              name="email"
                              className="form-control"
                              id="email"
                              placeholder={t('subseller.email')}
                            />
                          </FormItem>
                        </div>

                        <div className="form-group">
                          <label htmlFor="password">{t('PASSWORD')} *</label>
                          <FormItem
                            name="password"
                            showValidateSuccess="true"
                            hasFeedback={true}
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
                          <label>{t('PERMISSION')} *</label>
                          <div className="p-container">
                            <Checkbox.Group onChange={onChange} defaultValue={props.edit ? () => handlingChecked(formik.values.permission) : null} name="permission">
                              {permission.map((permi, _id) => {
                                return (
                                  (formik.values.permission && formik.values.permission[_id] && formik.values.permission[_id].id) ? (
                                    (formik.values.permission[_id].id === permi.id) ? (
                                      <span className="p-content" key={_id}>
                                        <Checkbox key={_id} value={permi.id}>
                                          <span className="p-name">
                                            {i18n.language === 'en' ? permi.name : permi.name_ar}
                                          </span>
                                        </Checkbox>
                                      </span> 
                                    ) : (
                                      <span className="p-content" key={_id}>
                                          <Checkbox key={_id} value={permi.id}>
                                            <span className="p-name">
                                              {i18n.language === 'en' ? permi.name : permi.name_ar}
                                            </span>
                                          </Checkbox>
                                        </span>
                                    )
                                  ) : (
                                    <span className="p-content" key={_id}>
                                        <Checkbox key={_id} value={permi.id}>
                                          <span className="p-name">
                                            {i18n.language === 'en' ? permi.name : permi.name_ar}
                                          </span>
                                        </Checkbox>
                                      </span>
                                  )
                                )
                              })}
                            </Checkbox.Group>
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
                      loading={active}
                      disabled={false}
                    >
                      {props.edit ? `${t('EDIT')} ${t('Subseller')}` : `${t('ADD')} ${t('Subseller')}`}
                    </SubmitButton>
                  </div>
                ) : null}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default withRouter(AddEdit);
