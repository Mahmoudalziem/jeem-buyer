import ToastHandling from "../../common/toastify";
import connect from "../../../services/connect";
import handlingData from "../../common/handlingData";
import handlingError from "../../common/handlingError";

const http = new connect();

/***
 * Fetch Data
 *
 * @return JsonData
 */

export const updatePassword = async (data) => {
  return http
    .postData(data, `${http.BASE_URL_BUYER}/setting?_method=PUT`, true)
    .then((res) => {
      if (handlingData(res)) {
        return {
          data: res.data.data,
          status: true,
        };
      } else {
        ToastHandling("error", res.data.message);
      }
    })
    .catch((err) => {
      handlingError(err);
    });
};


export const updateInfo = async (data) => {
  return http
    .postData(data, `${http.BASE_URL_BUYER}/info?_method=PUT`, true)
    .then((res) => {
      if (handlingData(res)) {
        return {
          data: res.data.data,
          status: true,
        };
      } else {
        ToastHandling("error", res.data.message);
      }
    })
    .catch((err) => {
      handlingError(err);
    });
};