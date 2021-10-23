import ToastHandling from "../../common/toastify";
import connect from "../../../services/connect";
import handlingData from '../../common/handlingData'
import handlingError from '../../common/handlingError'

import {message} from 'antd'

const http = new connect();

const key = 2;

export const fetchDelivery = () => {
    return http
      .getData(null, `${http.BASE_URL_SELLER}/delivery`, true)
      .then((res) => {
        if (res.data.status) {
          return {
              data : res.data.data,
              status : true
          }
        } else {
          
            return {
                data : res.data.errors,
                status: false
            }
        }
      })
      .catch((err) => {
        handlingError(err);
      });
  };

export const updateDelivery = (rowIndex,index) => {

    message.loading('Loading ...',key);

  http
    .postData(null, `${http.BASE_URL_SELLER}/order/${rowIndex}?_method=PUT&d_id=${index}`)

    .then((res) => {
        return handlingData(res);
    })
    .catch(err => {
        handlingError(err).forEach((element,index) => {

          ToastHandling("error", element.message);

        })
    });

    return true;
};
