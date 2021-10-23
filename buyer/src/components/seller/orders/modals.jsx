import React, { useState } from "react";
import { Modal } from "antd";
import * as Yup from "yup";
import { Create } from "../../common/actions";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import {
  DatePicker,
  TimePicker,
  Form as FormFormik,
  Input,
  FormItem,
} from "formik-antd";

const { TextArea } = Input;

export const SendMessage = (props) => {
  const [loading, isLoading] = useState(false);
  const { t } = useTranslation();

  const initialValues = { message: "" };

  const validateSchema = () =>
    Yup.object({
      message: Yup.string().min(5).required(t("MESSAGE_REQUIRED")),
    });

  const submitForm = (values, { setSubmitting, resetForm }) => {
    isLoading(true);

    setSubmitting(false);

    values.id = props.dataIndex;

    Create("message", values, "seller", true).then((res) => {
      if (res.status) {
        isLoading(false);
        resetForm({});
        setTimeout(() => {
          props.handlingProps(false);
        }, 15);
      } else {
        isLoading(false);
        resetForm({});
        setTimeout(() => {
          props.handlingProps(false);
        }, 15);
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
          string: "Send",
          form: `send-message${props.dataIndex}`,
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema}
          onSubmit={submitForm}
        >
          {({ values, handleSubmit }) => (
            <FormFormik id={`send-message${props.dataIndex}`}>
              <div className="group-input">
                <FormItem
                  name="message"
                  hasFeedback={true}
                  showValidateSuccess={true}
                >
                  <TextArea
                    name="message"
                    className="w-100"
                    rows="6"
                    placeholder={t("MESSAGE")}
                  />
                </FormItem>
              </div>
            </FormFormik>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export const CreateMeeting = (props) => {
  const [loading, isLoading] = useState(false);
  const { t } = useTranslation();

  const initialValues = {
    topic: "",
    start: "",
    duration: "",
    agenda: "",
  };

  const validateSchema = () =>
    Yup.object({
      topic: Yup.string().min(5).required(t("TOPIC_REQUIRED")),
      start: Yup.date().required(t("START_REQUIRED")),
      agenda: Yup.string().nullable(),
      duration: Yup.string().required(t("DURATION_REQUIRED")),
    });

  const submitForm = (values, { setSubmitting, resetForm }) => {
    isLoading(true);

    setSubmitting(false);

    values.id = props.dataIndex;

    Create("meeting", values, "seller", true).then((res) => {
      if (res.status) {
        isLoading(false);

        resetForm({});

        setTimeout(() => {
          props.handlingProps(false);
        }, 15);
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
          form: `create-meeting${props.dataIndex}`,
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema}
          onSubmit={submitForm}
          render={(formik) => (
            <FormFormik id={`create-meeting${props.dataIndex}`}>
              <div className="group-input">
                <FormItem
                  name="topic"
                  hasFeedback={true}
                  showValidateSuccess={true}
                >
                  <Input name="topic" placeholder={t("TOPIC")} />
                </FormItem>
              </div>

              <div className="group-input">
                <FormItem
                  name="duration"
                  hasFeedback={true}
                  showValidateSuccess={true}
                >
                  <TimePicker name="duration" placeholder={t("DURATION")} />
                </FormItem>
              </div>

              <div className="group-input">
                <FormItem
                  name="start"
                  hasFeedback={true}
                  showValidateSuccess={true}
                >
                  <DatePicker
                    name="start"
                    // showTime={true}
                    placeholder={t("START")}
                  />
                </FormItem>
              </div>

              <div className="group-input">
                <FormItem
                  name="agenda"
                  hasFeedback={true}
                  showValidateSuccess={true}
                >
                  <Input
                    name="agenda"
                    placeholder={`${t("AGENDA")}} (optional)`}
                  />
                </FormItem>
              </div>
            </FormFormik>
          )}
        />
      </Modal>
    </div>
  );
};
