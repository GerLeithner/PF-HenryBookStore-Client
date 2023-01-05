import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./redux/store/index.js";
import reportWebVitals from "./reportWebVitals";

const { REACT_APP_AUTH_CLIENTID, REACT_APP_AUTH_DOMAIN } = process.env;

ReactDOM.render(
  <BrowserRouter>
    <Auth0Provider
      domain={REACT_APP_AUTH_DOMAIN}
      clientId={REACT_APP_AUTH_CLIENTID}
      redirectUri={window.location.origin}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
