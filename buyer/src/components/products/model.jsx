import React, { useState } from "react";
import * as Yup from "yup";
import { Create } from "../common/actions";
import { Formik } from "formik";
import { Form, Input, FormItem, InputNumber } from "formik-antd";
import { Rate, Modal } from "antd";
import { validationRate } from "./validationRate";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const { TextArea } = Input;

export const MakeReview = (props) => {
  const [rate, setRate] = useState();
  const [loading, isLoading] = useState(false);

  const initialValues = { content: "" };
  const { t } = useTranslation();

  const validateSchema = () =>
    Yup.object({
      content: Yup.string().required(t('CONTENT_REQUIRED')),
    });

  const submitForm = (values, { setSubmitting, resetForm }) => {

    if (validationRate(rate)) {

      values.count = rate;

      values.id = props.dataIndex;

      isLoading(true);

      setSubmitting(false);

      Create("review", values, "buyer",true).then((res) => {
        if (res.status) {
          isLoading(false);

          resetForm({});
          setRate();
          props.onCancel();
        }
      });
    }
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
          string: "Ok",
          form: "send-count",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema}
          onSubmit={submitForm}
        >
          {(formik) => (
            <Form id="send-count" className="make-review">
              <div className="group-input mb-4">
                <Rate defaultValue={0} onChange={(value) => setRate(value)} />
              </div>
              <div className="group-input">
                <FormItem
                  name="content"
                  hasFeedback={true}
                  showValidateSuccess={true}
                >
                  <TextArea
                    name="content"
                    rows="6"
                    placeholder={t('WRITE_REVIEW')}
                  />
                </FormItem>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export const MakeNegotiate = (props) => {

  const [loading, isLoading] = useState(false);

  const { t } = useTranslation();

  const params = useParams();
  
  const initialValues = { price: "", notes: "" };

  const validateSchema = () =>
    Yup.object({
      price: Yup.number().required(t('PRICE_REQUIRED')).positive().integer(),
      notes: Yup.string(),
    });

  const submitForm = (values, { setSubmitting, resetForm }) => {

    values.title = params.product;

    values.count = props.count;

    isLoading(true);

    setSubmitting(false);

    Create("negotiate", values, "buyer",true).then((res) => {
      if (res.status) {
        isLoading(false);

        resetForm({});

        props.onCancel();
      }
    });

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
          string: "Ok",
          form: "make-negotiate",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema}
          onSubmit={submitForm}
        >
          {(formik) => (
            <Form id="make-negotiate" className="make-review">
              <div className="form-group">
                <FormItem
                  name="price"
                  hasFeedback={true}
                  showValidateSuccess={true}
                >
                  <InputNumber
                    name="price"
                    id="price"
                    placeholder={t("product.price")}
                    formatter={(value) =>
                      `SAR ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    step="number"
                    parser={(value) => value.replace(/\SAR\s?|(,*)/g, "")}
                  />
                </FormItem>
              </div>
              <div className="group-input">
                <FormItem
                  name="notes"
                  hasFeedback={true}
                  showValidateSuccess={true}
                >
                  <TextArea name="notes" rows="6" placeholder={`${t('NOTES')} (Optional)`} />
                </FormItem>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};
