import React, { useEffect, useState } from "react";
import { BrowserRouter as Router,useHistory,Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import Spinner from "./layouts/spinner/spinner";
import { Listener, FetchToken } from "./notification/notification";
import { FetchBuyer, FetchNotification } from "./actions";
import BrowserRouter from "./layouts/browser/router";
import Navbar from "./layouts/navbar/navbar";
import Sidebar from "./layouts/sidebar/sidebar";
import { Breadcrumb } from "antd";

const Buyer = () => {
  const [loading, setLoading] = useState(true);

  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const history = useHistory();

  document.body.className = i18n.dir();

  useEffect(() => {
    
    FetchBuyer(dispatch, history, setLoading);

    Listener(dispatch);

    FetchToken(dispatch);

    FetchNotification(dispatch);
  }, []);

  if (loading) {
    return (
      <Router>
        <div className="category">
          <div className="category-header">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">{t("HOME")}</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{t("PROFILE")}</Breadcrumb.Item>
              <Breadcrumb.Item>{t("ACCOUNT_SUMMARY")}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="buyer">
            <Navbar />
            <div className="buyer-container">
            <div className="row">
              <div className="col-lg-3 col-12">
                <Sidebar />
              </div>
              <div className="col-lg-9 col-12">
                <div className="profile-content">
                  <BrowserRouter />
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </Router>
    );
  } else {
    return <Spinner width="100%" height="100vh" />;
  }
};

export default Buyer;
