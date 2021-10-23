import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { useTranslation, Trans } from "react-i18next";
import { Input } from "antd";
import { clearItems } from "../../../lib/local-storage";
import {
  FetchToken,
  ClearNotigication,
} from "../../buyer/notification/notification";
import { Logout } from "../../common/actions";

/// icons

import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuIcon from "@material-ui/icons/Menu";

//Assets

import Logo from "../../../assets/images/logo/logo.svg";
import avatar from "../../../assets/images/logo/avatar.svg";

const Header = (props) => {
  const [search, setSearch] = useState();

  const dispatch = useDispatch();

  const { role, status } = useSelector((state) => state.authorization);

  const { name,image, notification, message,count } = useSelector((state) => (role === 'seller' ? state.seller : state.buyer));

  const [toggleHeader, setToggleHeader] = useState(false);

  const history = useHistory();

  const { t, i18n } = useTranslation("translations");

  const [lang, setLang] = useState("us");

  const accessNotification = () => {
    FetchToken(dispatch);
  };

  useEffect(() => {

    i18n.language === "ar" ? setLang("sa") : setLang("us");

    
  }, []);

  const clearNotification = () => {
    ClearNotigication().then((res) => {
      if (res.data.status) {
        console.log(res);
      }
    });
  };

  const changLang = (lng) => {
    i18n.changeLanguage(lng);

    document.body.className = i18n.dir();

    lng === "ar" ? setLang("sa") : setLang("us");
  };

  const logOut = () => {
    Logout(null, "buyer").then((res) => {
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
          type: "BUYER",
          payload: {
            data: null,
          },
        });

        clearItems(["token", "role", "name"]);

        history.push("/");
      }
    });
  };

  return (
    <div className="header-parent">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-md-2 col-12  d-flex align-items-center header-one">
            <div className="header-logo">
              <Link to="/">
                <img src={Logo} alt="Jeem Logo" />
              </Link>
            </div>

            <div className="search-container">
              <div className="search-icon">
                <SearchIcon />
              </div>
              <div className={`search-bar`}>
                <Input
                  type="text"
                  name="search"
                  placeholder={t("SEARCH_FOR_PRODUCTS")}
                  onChange={(event) => setSearch(event.target.value)}
                  disabled={
                    history.location.pathname.startsWith("/search")
                      ? true
                      : false
                  }
                />
                {search ? (
                  <Link to={`/search/${search}`}>
                    <SearchIcon />
                  </Link>
                ) : (
                  <SearchIcon />
                )}
              </div>
            </div>
          </div>

          <div
            className={`col-lg-3 col-md-5 col-12 header-two ${
              toggleHeader ? "active" : ""
            }`}
          >
            <div className="nav-container">
              <Link to="/">
                {t("HOME")}
                <span></span>
              </Link>
              <Link to="/products">
                {t("PRODUCTS")}
                <span></span>
              </Link>
            </div>
          </div>

          <div className="col-md-5 col-12 header-three">
            <ul className="navbar-nav">
              <li className="nav-item dropdown language-dropdown border-0">
                <Dropdown>
                  <Dropdown.Toggle className="nav-link count-indicator p-0 toggle-arrow-hide bg-transparent">
                    <div className="d-inline-flex mr-0">
                      <div className="flag-icon-holder">
                        <i className={`flag-icon flag-icon-${lang}`}></i>
                      </div>
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="navbar-dropdown preview-list">
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

              <li className="nav-item border-0">
                {status ? (
                  role === 'buyer' ? (
                    <Link to="/cart" className="cart-icon-container">
                      <div className="number-on-cart">{count}</div>
                      <ShoppingCartIcon />
                    </Link>
                  ) : (
                    <div className="cart-icon-container">
                      <div className="number-on-cart">0</div>
                      <ShoppingCartIcon />
                    </div>
                  )
                ) : (
                  <Link to="/login/buyer" className="cart-icon-container">
                      <div className="number-on-cart">0</div>
                      <ShoppingCartIcon />
                    </Link>
                )}
              </li>

              {status ? (
                <>
                  {role === "buyer" ? (
                    <li className="nav-item border-0">
                      <Dropdown>
                        <Dropdown.Toggle className="nav-link count-indicator p-0 toggle-arrow-hide bg-transparent">
                          <i className="mdi mdi-bell-outline"></i>
                          <span className="count bg-success">
                            {message[0] && message[0].title
                              ? message.length
                              : 0}
                          </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="navbar-dropdown preview-list">
                          <div className="dropdown-item d-flex align-items-center">
                            <p className="mb-0 font-weight-medium float-left">
                              {t("You have")}{" "}
                              {message[0] && message[0].title
                                ? message.length
                                : 0}{" "}
                              {t("new notifications")}{" "}
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
                          {message.map((element, key) =>
                            element.title ? (
                              <>
                                <div
                                  className="preview-item d-flex align-items-center"
                                  key={key}
                                >
                                  <Link
                                    to="meeting"
                                    className="d-flex align-items-center"
                                  >
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
                              </>
                            ) : null
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    </li>
                  ) : null}

                  <li className="nav-item  nav-profile border-0">
                    {role === "seller" ? (
                      <Link to="/dashboard">
                        <span className="profile-text">{name}</span>
                        <img
                          className="img-xs rounded-circle"
                          src={image ? image : avatar}
                          alt="Profile"
                        />
                      </Link>
                    ) : (
                      <Dropdown>
                        <Dropdown.Toggle className="nav-link count-indicator bg-transparent">
                          <span className="profile-text">{name}</span>
                          <img
                            className="img-xs rounded-circle"
                            src={image ? image : avatar}
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

                          <Link
                            to="/profile"
                            className="dropdown-item preview-item d-flex align-items-center border-0 mt-2"
                          >
                            <Trans>Manage Accounts</Trans>
                          </Link>

                          <Dropdown.Item
                            className="dropdown-item preview-item d-flex align-items-center border-0"
                            onClick={logOut}
                          >
                            <Trans>Sign Out</Trans>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </li>
                </>
              ) : (
                <li className="nav-item  nav-profile border-0">
                  <Link to="/login">
                    <img
                      className="img-xs rounded-circle"
                      src={avatar}
                      alt="Profile"
                    />
                  </Link>
                </li>
              )}

              <li
                className="nav-item burger-menu"
                onClick={() => setToggleHeader(!toggleHeader)}
              >
                <MenuIcon />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
