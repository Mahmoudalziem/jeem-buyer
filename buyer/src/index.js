import "./i18n";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { registerServiceWorker } from "./serviceWorker";
import ScrollToTop from './lib/scrollToTop'
import store from "./store/store";
import ReactGA from 'react-ga';

ReactGA.initialize('G-RNCJ9G4NT8');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
