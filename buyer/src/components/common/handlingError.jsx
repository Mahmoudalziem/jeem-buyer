import { message } from "antd";
import ToastHandling from "./toastify";

const handlingError = (err, key) => {
  if (err.response.status >= 500) {
    message.error("Please check your connection then reload", 3);
  } else {
    message.error(err.response.data.message, key);

    let error = err.response.data.errors;

    if (error.title) {
      ToastHandling("error", error.title[0]);
    }

    if (error.name) {
      ToastHandling("error", error.name[0]);
    }

    if (error.phone) {
      ToastHandling("error", error.phone[0]);
    }
    if (error.email) {
      ToastHandling("error", error.email[0]);
    }

    if (error.topic) {
      ToastHandling("error", error.topic[0]);
    }
    if (error.content) {
      ToastHandling("error", error.content[0]);
    }

    if (error.m_neg) {
      ToastHandling("error", error.m_neg[0]);
    }
  }
};

export default handlingError;
