import React, { useEffect,useState } from "react";
import Navbar from "./layouts/navbar/navbar";
import Sidebar from "./layouts/sidebar/sidebar";
import BrowserRouter from "./layouts/browser/router"
import { BrowserRouter as Router,useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch,useSelector } from "react-redux";
import Spinner from '../layouts/spinner/spinner'
import {Listener,FetchToken} from './layouts/notification/notification'
import {FetchSeller,FetchNotification} from './actions'
import ScrollToTop from '../../lib/scrollToTop'

const Seller = () => {

  const [loading, setLoading] = useState(false);

  const { i18n } = useTranslation();

  const dispatch = useDispatch();

  const history = useHistory();

  const { image } = useSelector((state) => state.seller);

  document.body.className = i18n.dir();

  useEffect(() => {

    FetchSeller(dispatch,history,setLoading);

    Listener(dispatch);

    FetchToken(dispatch);

    FetchNotification(dispatch);

  }, []);

  if(loading){
    return (
    <Router>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar image={image}/>
          <div className="main-panel">
            <div className="content-wrapper">
              <ScrollToTop />
              <BrowserRouter />
            </div>
          </div>
        </div>
      </div>
    </Router>
    );
  }else{
    return <Spinner width="100%" height="100vh" />
  }

};

export default Seller;
