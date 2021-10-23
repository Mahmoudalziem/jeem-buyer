import AddEdit from './addEdit'
import {Fragment} from 'react'

const AddProduct = (props) => {

  const initialValues = {};
  
  return (
      <Fragment>
          <AddEdit initialValues={initialValues} />
      </Fragment>
  )
};

export default AddProduct;
