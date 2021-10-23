import ToastHandling from "../../common/toastify";
import connect from "../../../services/connect";
import handlingError from '../../common/handlingError'

const http = new connect();

export const permissions = async () => {
    return http
    .getData(null, `${http.BASE_URL_SELLER}/permission`)

    .then((res) => {
        return res.data.data;
    })
    .catch(err => {
        handlingError(err).forEach((element,index) => {

            if(element.m_neg){

                ToastHandling("error", element.m_neg[0]);
            }

            if(element.title){

                ToastHandling("error", element.title[0]);
            }

        })
    });

}