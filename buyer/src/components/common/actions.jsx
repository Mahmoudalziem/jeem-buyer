import connect from "../../services/connect";
import handlingData from "./handlingData";
import handlingError from "./handlingError";
import ToastHandling from "./toastify";

const http = new connect();

const key = 2;

/***
 * Fetch Data
 *
 * @return JsonData
 */

const Fetch = async (path, type, toast = false) => {
  type = type === "buyer" ? http.BASE_URL_BUYER : http.BASE_URL_SELLER;

  return http
    .getData(null, `${type}/${path}`, true)
    .then((res) => {
      if (toast) {
        return handlingData(res, key);
      }
      if(res.data.status){
        return {
          data: res.data.data,
          status: res.data.status,
        }
      }else{
        ToastHandling("error", res.data.message);
        return {
          data: res.data.data,
          status: res.data.status,
        }
      }
    })
    .catch((err) => {
      handlingError(err);
    });
};

/****
 * Create Method
 */

const Create = async (path, data, type, toast = false) => {
  
  type = type === 'admin' ? http.BASE_URL_ADMIN : (type === "buyer" ? http.BASE_URL_BUYER : http.BASE_URL_SELLER);

  return http
    .postData(data, `${type}/${path}`, false)
    .then((res) => {
      if(toast){
        return handlingData(res, key);
      }else{
        return res.data
      }
    })
    .catch((err) => {
      return handlingError(err, key);
    });
};

/****
 * Update Method
 */

const Update = async (path, data, id, type) => {
  type = type === "buyer" ? http.BASE_URL_BUYER : http.BASE_URL_SELLER;

  return http
    .postData(data, `${type}/${path}/${id}?_method=PUT`, false)

    .then((res) => {
      return handlingData(res, key);
    })
    .catch((err) => {
      return handlingError(err);
    });
};

/****
 * Update Method
 */

const UpdateStatus = async (path, id, type) => {
  type = type === "buyer" ? http.BASE_URL_BUYER : http.BASE_URL_SELLER;
  return http
    .postData(null, `${type}/${path}/status/${id}?_method=PUT`, false)

    .then((res) => {
      return handlingData(res, key);
    })
    .catch((err) => {
      return handlingError(err, key);
    });
};

/****
 * Delete Method
 */

const Delete = async (path, index, type) => {
  type = type === "buyer" ? http.BASE_URL_BUYER : http.BASE_URL_SELLER;
  return http
    .deleteData(null, `${type}/${path}/${index}`, true)
    .then((res) => {
      return handlingData(res, key);
    })
    .catch((err) => {
      return handlingError(err, key);
    });
};

/****
 * View Method
 */

const View = async (path, index, type, toast = false) => {
  type = type === "buyer" ? http.BASE_URL_BUYER : http.BASE_URL_SELLER;
  return http
    .getData(null, `${type}/${path}/${index}`, true)
    .then((res) => {
      if (toast) {
        return handlingData(res, key);
      }
      return {
        data: res.data.data,
        status: res.data.status,
      };
    })
    .catch((err) => {
      return handlingError(err, key);
    });
};

/****
 * Login Method
 */

const LoginForm = async (values, type) => {
  type = type === "buyer" ? http.BASE_URL_BUYER : http.BASE_URL_SELLER;

  return http
    .postData(values, `${type}/login`)

    .then((res) => {
      return handlingData(res, key);
    })
    .catch((err) => {
      return handlingError(err, key);
    });
};

/****
 * Register Method
 */

const RegisterForm = async (values, type) => {
  type = type === "buyer" ? http.BASE_URL_BUYER : http.BASE_URL_SELLER;

  return http
    .postData(values, `${type}/register`)

    .then((res) => {
      return handlingData(res, key);
    })
    .catch((err) => {
      return handlingError(err, key);
    });
};

/****
 * Logout Method
 */

const Logout = async (props, type = "seller") => {
  type = type === "buyer" ? http.BASE_URL_BUYER : http.BASE_URL_SELLER;

  return http
    .postData(props, `${type}/logout`)
    .then((res) => {
      return handlingData(res, key);
    })
    .catch((err) => {
      return handlingError(err, key);
    });
};

export {
  Fetch,
  Create,
  Update,
  UpdateStatus,
  Delete,
  View,
  LoginForm,
  Logout,
  RegisterForm,
};