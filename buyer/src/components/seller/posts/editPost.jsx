import React, { useState, useEffect } from "react";
import { useParams,useRouteMatch } from "react-router-dom";
import Spinner from "../../layouts/spinner/spinner";
import AddEdit from "./addEdit";
import {View} from '../../common/actions'

const EditProduct = (props) => {

  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [comments,setComments] = useState([]);

  const initialValues = {};

  const params = useParams();

  const Router = useRouteMatch();

  const ROUTER_VIEW = Router.path === "/dashboard/post/:slug" ? true : false;

  useEffect(() => {

    View('post',params.slug).then(
      res => {
        if(res.status){
          setData(res.data);
          setEdit(true);
        }
      }
    )

    viewComment();

  }, []);


  const viewComment = () => {

    return (
      ROUTER_VIEW ? (
        View('post/comment',params.slug).then(
          res => {
            if(res.status){
              setComments(res.data);
            }
          }
        )
      ) : null
    )
  }
  if (edit) {
    return <AddEdit initialValues={initialValues} data={data} comments={comments} edit={true}/>
  } else {
    return <Spinner />  
  }
};

export default EditProduct;
