import React ,{Fragment,useState,useEffect} from 'react'
import { Fetch } from "../common/actions";
import Spinner from '../layouts/spinner/spinner'

/// Components

import Slider from './slider'
import Categories from './categories'
import Products from './bestsellers'
import Carousel from './carousel'
import Tags from './tags'

const Home = (props) => {

  const [category,setCategory] = useState([]);
  const [product,setProduct] = useState([]);
  const [carousel,setCarousel] = useState([]);
  const [tag,setTag] = useState([]);
  const [loading,setLoading] = useState();

  useEffect(() => {

    /// Fetch Carousel
    Fetch("carousel",'buyer').then((res) => {
      if (res.status) {
        setCarousel(res.data);
      } else {
        console.log('error');
      }
    });
    /// Fetch Categories
    Fetch("category",'buyer').then((res) => {
      if (res.status) {
        setCategory(res.data);
      } else {
        console.log('error');
      }
    });
    /// Fetch best-products
    Fetch("best-products",'buyer').then((res) => {
      if (res.status) {
        setProduct(res.data);
      } else {
        console.log('error');
      }
    });
    /// Fetch Tags
    Fetch("tags",'buyer').then((res) => {
      if (res.status) {
        setTag(res.data);
        setLoading(true);
      } else {
        console.log('error');
      }
    });
  },[]);

  if(loading){
    return (
      <Fragment>
        <div className="home">
          <Slider data={carousel} />
          <Categories data={category} />
          <Carousel />
          <Products data={product} />
          {
            tag.map((item,index) => (
              <Tags data={item} key={index} />
            ))
          }
        </div>
      </Fragment>
    );
  }else{
    return <Spinner width="100%" height="100vh"/>
  }
};

export default Home;
