import ToastHandling from "./toastify";
import {message} from 'antd'

const handlingData = (res,key) => {
  
    if(res.data && res.data.status){

        ToastHandling("success", res.data.message);
        return {
          data: res.data.data,
          status: res.data.status,
        };
      }else{

          message.error(res.data.message, key);

          ToastHandling("error", res.data.message);

          if(res.data){
            return {
              data : res.data.data,
              status: res.data.status,
            };
          }
          return {
            status: res.data.status,
          };
      }
}

export default handlingData;