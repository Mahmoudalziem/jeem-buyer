import React ,{useState} from 'react'
import { Form as FormFormik, Input,FormItem } from "formik-antd";
import { Modal } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export const NewAddress = (props) => {

    const [loading, isLoading] = useState(false);
  
    const { t } = useTranslation();

    const initialValues = { phone: "", address: "" };

    const phoneRegExp =
    /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;

    const validationSchema = () =>
      Yup.object({
        phone: Yup.string()
        .required()
        .matches(phoneRegExp, "Phone number is not valid"),
        address: Yup.string().required(),
      });
  
    const submitForm = (values, { setSubmitting, resetForm }) => {

      setSubmitting(false);

      resetForm({});
      
      props.newData(values);

      props.onCancel();

    };
  
    return (
      <div className="modal-container d-none">
        <Modal
          title={props.title}
          visible={props.visible}
          confirmLoading={loading}
          onCancel={props.onCancel}
          okButtonProps={{
            htmlType: "submit",
            key: "submit",
            sring:"ok",
            form: "new-address",
          }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitForm}
          >
            {formik => 
              (
                <FormFormik
                id="new-address"
                className="new-address"
              >
                <div className="group-input">
                <FormItem
                    name="address"
                    hasFeedback={true}
                    showValidateSuccess={true}
                  >
                    <Input name="address" placeholder={t('ADDRESS')} />
                </FormItem>
                </div>
  
                <div className="group-input">
                  <FormItem
                    name="phone"
                    hasFeedback={true}
                    showValidateSuccess={true}
                  >
                    <Input name="phone" placeholder={t('PHONE')} />
                  </FormItem>
                </div>
  
              </FormFormik>
              )
            }
          </Formik>
        </Modal>
      </div>
    );
  };