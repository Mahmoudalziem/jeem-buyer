import AddEdit from "./addEdit";
import { Fragment } from "react";

const AddProduct = (props) => {
  const initialValues = {
    title: "",
    subtitle: "",
    price: "",
    discount: "",
    count: "",
    m_neg: "",
    category:"",
    carousel: "",
    tag: "",
  };

  return (
    <Fragment>
      <AddEdit initialValues={initialValues} />
    </Fragment>
  );
};

export default AddProduct;
