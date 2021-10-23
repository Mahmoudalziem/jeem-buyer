import React, { useState,useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation, Trans } from "react-i18next";
import { Logout } from "../../../common/actions";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FetchToken, ClearNotigication } from "../notification/notification";
import {clearItems} from '../../../../lib/local-storage'

const Navbar = (props) => {
  
  const dispatch = useDispatch();

  const { name,image, notification, message } = useSelector((state) => state.seller);

  const history = useHistory();

  const [lang, setLang] = useState("us");

  const accessNotification = () => {
    FetchToken(dispatch);
  };

  const clearNotification = () => {
    ClearNotigication().then((res) => {
      if (res.data.status) {
        console.log(res);
      }
    });
  };

  const { i18n, t } = useTranslation();

  useEffect(() => {
    i18n.language === "ar" ? setLang("sa") : setLang("us");
  }, []);

  const changLang = (lng) => {
    i18n.changeLanguage(lng);

    document.body.className = i18n.dir();

    lng === "ar" ? setLang("sa") : setLang("us");
  };

  const logOut = () => {
    Logout(null,'seller').then((res) => {
      if (res.status) {
        dispatch({
          type: "LOGOUT",
          payload: {
            token: null,
            role: null,
            status: false,
          },
        });

        dispatch({
          type: "SELLER",
          payload: {
            data: null,
          },
        });

        clearItems(['token','role','name']);

        history.push("/");
      }
    });
  };

  return (
    <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
        <button
          className="navbar-toggler navbar-toggler align-self-center"
          type="button"
          onClick={() => document.body.classList.toggle("sidebar-icon-only")}
        >
          <i className="mdi mdi-menu"></i>
        </button>
        <ul className="navbar-nav navbar-nav-left header-links align-self-center"></ul>

        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item dropdown language-dropdown border-0 pl-4">
            <Dropdown>
              <Dropdown.Toggle className="nav-link count-indicator p-0 toggle-arrow-hide bg-transparent">
                <div className="d-inline-flex mr-0">
                  <div className="flag-icon-holder">
                  <i className={`flag-icon flag-icon-${lang}`}></i>
                  </div>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="navbar-dropdown preview-list mt-3">
                <Dropdown.Item
                  className="dropdown-item  d-flex align-items-center"
                  href="en"
                  onClick={(e) => e.preventDefault()}
                  onSelect={changLang}
                >
                  <div className="flag-icon-holder">
                    <i className="flag-icon flag-icon-us"></i>
                  </div>
                  English
                </Dropdown.Item>

                <div className="dropdown-divider"></div>

                <Dropdown.Item
                  className="dropdown-item preview-item d-flex align-items-center"
                  href="ar"
                  onClick={(e) => e.preventDefault()}
                  onSelect={changLang}
                >
                  <div className="flag-icon-holder">
                    <i className="flag-icon flag-icon-sa"></i>
                  </div>
                  Arabic
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>

          <li className="nav-item  nav-profile border-0 ">
            <Dropdown>
              <Dropdown.Toggle className="nav-link count-indicator p-0 toggle-arrow-hide bg-transparent">
                <i className="mdi mdi-bell-outline"></i>
                <span className="count bg-success">{(message[0] && message[0].title) ? message.length : 0}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="navbar-dropdown preview-list">
                <div className="dropdown-item d-flex align-items-center">
                  <p className="mb-0 font-weight-medium float-left">
                    {t("You have")} {(message[0] && message[0].title) ? message.length : 0} {t("new notifications")}{" "}
                  </p>
                  {notification.status ? (
                    <button
                      onClick={clearNotification}
                      className="button_notification_clear badge badge-pill badge-primary float-right"
                    >
                      Clear All
                    </button>
                  ) : (
                    <button
                      onClick={accessNotification}
                      className="button_notification_permission badge badge-pill badge-primary float-right"
                    >
                      Get Permission
                    </button>
                  )}
                </div>
                <div className="dropdown-divider"></div>
                {message.map((element, key) => (
                  element.title ? (<>
                    <div
                      className="preview-item d-flex align-items-center"
                      key={key}
                    >
                      <Link to="meeting" className="d-flex align-items-center">
                        <div className="preview-thumbnail">
                          <i
                            className={`mdi mdi-alert m-auto text-primary`}
                          ></i>
                        </div>
                        <div className="preview-item-content py-2">
                          <h6 className="preview-subject text-dark mb-1">
                            {element.title}
                          </h6>
                          <p className="preview-subject text-dark mb-1">
                            {element.body}
                          </p>
                          <p className="small-text mb-0">
                            {" "}
                            <Trans>Just now</Trans>{" "}
                          </p>
                        </div>
                      </Link>
                    </div>
                    <div className="dropdown-divider"></div>
                  </>) : null
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </li>

          <li className="nav-item  nav-profile border-0">
            <Dropdown>
              <Dropdown.Toggle className="nav-link count-indicator bg-transparent">
                <span className="profile-text">{name}</span>
                <img
                  className="img-xs rounded-circle"
                  src={image}
                  alt="Profile"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu className="preview-list navbar-dropdown pb-3">
                <div className="dropdown-item p-0 preview-item d-flex align-items-center border-bottom">
                  <div className="d-flex">
                    <div className="py-3 px-4 d-flex align-items-center justify-content-center">
                      <i className="mdi mdi-bookmark-plus-outline mr-0"></i>
                    </div>
                    <div className="py-3 px-4 d-flex align-items-center justify-content-center border-left border-right">
                      <i className="mdi mdi-account-outline mr-0"></i>
                    </div>
                    <div className="py-3 px-4 d-flex align-items-center justify-content-center">
                      <i className="mdi mdi-alarm-check mr-0"></i>
                    </div>
                  </div>
                </div>

                <Link to="/dashboard/profile" className="dropdown-item preview-item d-flex align-items-center border-0 mt-2">
                    <Trans>Manage Accounts</Trans>
                </Link>

                <Link
                  to="/dashboard/setting"
                  className="dropdown-item preview-item d-flex align-items-center border-0 mt-2"
                >
                  <Trans>CHANGE_PASSWORD</Trans>
                </Link>
                <Dropdown.Item
                  className="dropdown-item preview-item d-flex align-items-center border-0"
                  onClick={logOut}
                >
                  <Trans>Sign Out</Trans>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          onClick={() => document.body.classList.toggle("sidebar-icon-only")}
        >
          <span className="mdi mdi-menu"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
