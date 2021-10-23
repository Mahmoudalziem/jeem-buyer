import { getToken, onMessageListener } from "../../../common/notify";
import connect from "../././../../../services/connect";

const http = new connect();

export const Listener = (dispatch) => {
  onMessageListener().then((payload) => {
    dispatch({
      type: "NOTIFICATION",
      payload: payload,
    });
  });
};

export const FetchToken = (dispatch) => {
  getToken()
    .then((firebaseToken) => {
      dispatch({
        type: "TOKEN",
        payload: {
          token: firebaseToken,
          status: firebaseToken ? true : false,
        },
      });
      http.postData(
        { token: firebaseToken },
        `${http.BASE_URL_SELLER}/notification`
      );
    })
    .catch((err) => {
      return err;
    });
};

export const ClearNotigication = () => {
  
  return http.deleteData(null, `${http.BASE_URL_SELLER}/notification`);
};
