import "./index.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
// import { api } from './store/apiSlice'
import { store } from "./store";

if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  worker.start({
    onUnhandledRequest: "bypass",
  });
}

// store.dispatch(api.endpoints.getDogs.initiate());
// store.dispatch(api.endpoints.getServices.initiate());
// store.dispatch(api.endpoints.getService.initiate("a098239"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
