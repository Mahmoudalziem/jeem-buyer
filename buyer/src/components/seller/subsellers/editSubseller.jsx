import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../layouts/spinner/spinner";
import AddEdit from "./addEdit";
import { View } from "../../common/actions";

const EditProduct = (props) => {

  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);

  const initialValues = { name: data.name, email: data.email,password:"",permission: data.permissions };

  const params = useParams();

  useEffect(() => {
    View('subseller',params.slug).then(
      res => {
        if(res.status){
          setData(res.data);
          setEdit(true);
        }else{
          setErrors(res.errors);
        }
      }
    )
  }, []);

  if (edit) {
    return <AddEdit initialValues={initialValues} data={data} errors={errors} edit={true}/>
  } else {
    return <Spinner />  
  }
};

export default EditProduct;
