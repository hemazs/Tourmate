import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./Components/Context/AuthProvider";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* AuthProvider for Context Api and Auth0Provider for Authentication */}
    <AuthProvider>
      <Auth0Provider
        domain="dev-v7ubglh0syly861y.us.auth0.com"
        clientId="hLcRHcG6KddVcvA8BxbGvmxFzxkoVEwG"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
