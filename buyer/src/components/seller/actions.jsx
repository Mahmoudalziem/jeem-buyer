import connect from "../../services/connect";
import { store, clearItems } from "../../lib/local-storage";

const http = new connect();

export const FetchSeller = (dispatch, history, setLoading) => {
  http
    .getData(null, `${http.BASE_URL_SELLER}/auth`)
    .then((res) => {
      if (res.data.status) {
        setLoading(true);
        dispatch({
          type: "GETSELLER",
          payload: res.data,
        });
        store('name',res.data.data.name)
      }
    })
    .catch((err) => {
      // dispatch({
      //   type: "LOGOUT",
      //   payload: {
      //     token: null,
      //     role: null,
      //     status: false,
      //   },
      // });

      // clearItems(["token","role","name"]);

      // history.push("/login/buyer");
    });
};

export const FetchNotification = (dispatch) => {
  http.getData(null, `${http.BASE_URL_SELLER}/notification`).then((res) => {
    if (res.data.status) {
      dispatch({
        type: "NOTIFICATION",
        payload: res.data,
      });
    }
  });
};
