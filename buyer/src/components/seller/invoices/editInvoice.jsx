import React, { useState, useEffect } from "react";
import { useRouteMatch, useParams } from "react-router-dom";
import connect from "../../../services/connect";
import Spinner from "../../layouts/spinner/spinner";
import AddEdit from "./addEdit";

const http = new connect();

const EditProduct = (props) => {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);

  const initialValues = { name: data.name, charge:data.shipping_charge};

  const params = useParams();

  const match = useRouteMatch("/dashboard/invoice/:slug/edit");

  useEffect(() => {
    if (match && match.isExact) {
      fetch();
    }
  }, []);

  const fetch = () => {
    http
      .getData(null, `${http.BASE_URL_SELLER}/invoice/${params.slug}`, true)
      .then((res) => {
        if (res.data.status) {
          setData(res.data.data);
          setEdit(true);
        } else {
          setErrors(res.data.errors);
        }
      })
  };
  if (edit) {
    return <AddEdit initialValues={initialValues} data={data} errors={errors} edit={true}/>
  } else {
    return <Spinner />  
  }
};

export default EditProduct;
