import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

/// Images

import CustomerIcon from "../../assets/images/login/customer.png";
// @ts-ignore
import SellerIcon from "../../assets/images/login/seller.png";

const Auth = (props) => {
    
  const { t } = useTranslation();

  return (
    <Fragment>
      <div className="auth-container">
        <div className="col-md-6 mx-auto col-12">
          <div className="header">
            <h3>{t("WHO_ARE_YOU")}</h3>
          </div>
          <div className="body">
            <div className="row">
              <div className="col-6">
                <Link to="/login/buyer" className="right-btn">
                  <img src={CustomerIcon} className="buyer" alt="" />
                  <p className="buyer">{t("CUSTOMER")}</p>
                </Link>
              </div>
              <div className="col-6">
                <Link to="/login/seller" className="left-btn">
                  <img src={SellerIcon} alt="" />
                  <p>{t("SELLER")}</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Auth;
