import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import store from "./redux/redux-store";

// Init VK  Mini App
bridge.send("VKWebAppInit").then();

const rerenderTree = (state) => {
  ReactDOM.render(
          <App
              state={state}
              dispatch={store.dispatch.bind(store)}
          />
      , document.getElementById("root"));

  // if (process.env.NODE_ENV === "development") {
  //   import("./eruda").then(({ default: eruda }) => {}); //runtime download
  // }
}

rerenderTree(store.getState());
store.subscribe(() => {
    let state = store.getState()
    rerenderTree(state);
});
