import axios from 'axios'

class connect {

    TOKEN = localStorage.getItem('token');

    BASE_URL = (process.env.REACT_APP_NODE_ENV === 'development') ? process.env.REACT_APP_BACKEND_DEVELOPMENT : process.env.REACT_APP_BACKEND_PRODUCTION;

    BASE_URL_BUYER = 'api/buyer';

    BASE_URL_SELLER = 'api/seller';

    BASE_URL_ADMIN = 'api/admin';

    AXIOS_OPTION = (method, url, data = null, processData = true) => (
        {
            method: method,
            url: url,
            baseURL: this.BASE_URL,
            data : data,
            headers : {
                'Authorization': `bearer ${localStorage.getItem('token')}`,
                'Accept-Language': localStorage.getItem('i18nextLng'),
                'Accept' : 'application/json',
                'Content-Type': "application/json"
            },
            processData : processData
        }
    )

    postData = (data,url,processData) => (

        axios(this.AXIOS_OPTION('POST',url,data,processData))
    )

    getData = (data = null,url,processData) => (

        axios(this.AXIOS_OPTION('get',url,data,processData))
    )

    putData = (data,url,processData) => (

        axios(this.AXIOS_OPTION('put',url,data,processData))
    )

    patchData = (data,url,processData) => (

        axios(this.AXIOS_OPTION('patch',url,data,processData))
    )

    deleteData = (data,url,processData) => (

        axios(this.AXIOS_OPTION('delete',url,data,processData))
    )
}

export default connect;