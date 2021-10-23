import React, { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import Spinner from "../../layouts/spinner/spinner";
import AddEdit from "./addEdit";
import { View } from "../../common/actions";

const EditProduct = (props) => {
  
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);

  const initialValues = {
    title: data.title,
    subtitle: data.subtitle,
    price: data.price,
    discount: data.discount,
    count: data.count,
    m_neg: data.max_neg,
    category: data.category_id,
    carousel: data.carousel_id,
    tag: data.tag_id,
  };

  const params = useParams();

  useEffect(() => {

    View('product',params.slug).then(
      res => {
        if(res.status){
          setData(res.data);
          setEdit(true);
        }
      }
    )
  }, []);

  if (edit) {
    return (
      <AddEdit
        initialValues={initialValues}
        data={data}
        edit={true}
      />
    );
  } else {
    return <Spinner />;
  }
};

export default EditProduct;
