import AddEdit from './addEdit'
import {Fragment} from 'react'

const AddProduct = (props) => {

  const initialValues = { title: ""};
  
  return (
      <Fragment>
          <AddEdit initialValues={initialValues} />
      </Fragment>
  )
};

export default AddProduct;
