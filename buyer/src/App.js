import "./App.scss";
import React, { Fragment, useEffect } from "react";
import { useHistory,withRouter } from "react-router-dom";
import Browser from "./components/layouts/browser/router";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import Header from "./components/layouts/header/header";
import Footer from "./components/layouts/footer/footer";
import connect from "./services/connect";
import { useDispatch, useSelector } from "react-redux";
import { clearItems, store } from './lib/local-storage'

const http = new connect();

const App = (props) => {

  const { i18n } = useTranslation();

  const dispatch = useDispatch();

  const { role, status } = useSelector(s => s.authorization);

  document.body.className = i18n.dir();

  const history = useHistory();

  useEffect(() => {
    handlingClass();
    if (status) {
      Auth();
    }
  }, []);

  const Auth = () => {

    let path = (role === "buyer") ? http.BASE_URL_BUYER : http.BASE_URL_SELLER;

    http.getData(null, `${path}/auth`).then((res) => {
      if (res.data.status) {
        role === "buyer" ? (
          dispatch({
            type: "GETBUYER",
            payload: res.data,
          })
        ) : (
          dispatch({
            type: "GETSELLER",
            payload: res.data,
          })
        )
        store("name", res.data.data.name);
      }
    }).catch((err) => {
      dispatch({
        type: "LOGOUT",
        payload: {
          token: null,
          role: null,
          status: false,
        },
      });

      clearItems(["token", "role", "name"]);

      history.push("/login");
    });
  };

  const handlingClass = () => {
    window.addEventListener("resize", () => {
      const myWidth = window.innerWidth;

      if (myWidth <= 976) {
        document.body.classList.add("sidebar-icon-only");
      }
    });
  };
  return (
    <Fragment>
      {props.location.pathname.startsWith("/dashboard") ? null : <Header />}
      <div
        className={
          props.location.pathname.startsWith("/dashboard")
            ? "parent"
            : `main-parent`
        }
      >
        <Browser />
      </div>
      {props.location.pathname.startsWith("/dashboard") ? null : <Footer />}
      <ToastContainer />
    </Fragment>
  );
};

export default withRouter(App);
