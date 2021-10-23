import AddEdit from './addEdit'
import {Fragment} from 'react'

const AddProduct = (props) => {

  const initialValues = { name: "",charge:''};
  
  return (
      <Fragment>
          <AddEdit initialValues={initialValues} />
      </Fragment>
  )
};

export default AddProduct;
