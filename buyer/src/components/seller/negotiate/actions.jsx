import ToastHandling from "../../common/toastify";
import {Update} from "../../common/actions";


export const sendPrice = (rowIndex,price,updateIndex) => {


    if(price < 5){

        ToastHandling("error", "price must be up { 5 } ASR");   

        return false;
    }

    Update('negotiate',{price : price},rowIndex).then(res => {
        if(!res.data.status){
            updateIndex('pending');
        }
    })

};
