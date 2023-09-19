import React from "react";
import ReactDOM from "react-dom";
import CustomApp from "./CustomApp"; 
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomApp /> 
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
