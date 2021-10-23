import React from "react";
import { useTranslation } from "react-i18next";
import {useSelector} from 'react-redux'

//images

const Navbar = () => {

  const { t } = useTranslation();
  
  const {name,country,city,email,phone,image} = useSelector(s => s.buyer);

  return (
    <div className="seller-container">
      <div className="row">
        <div className="col-lg-4 col-md-6 col-12">
          <div className="profile-header">
            <div className="profile-picture">
              <img src={image} alt="" />
            </div>
            <div className="profile-name">
              <h1>{name}</h1>
              <p>{email}</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-12">
          <div className="seller-desc">
            <h4>{t("ACCOUNT_INFORMATION")}</h4>
            <p>
              {t("EMAIL")} : <span>{email}</span>
            </p>
            <p>
              {t("PHONE")} : <span>{phone}</span>
            </p>
          </div>
        </div>

        <div className="col-md-4 col-12">
          <div className="working-at">
            <h4>{t("PERSONALE_INFORMATION")}</h4>
            <p>
              {t("COUNTRY")} : <span>{country}</span>
            </p>
            <p>
              {t("CITY")} : <span>{city}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
