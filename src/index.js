import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import store from "./redux/redux-store";
import {setAllowMessagesAC} from "./redux/main-reducer";
import {AdaptivityProvider,ConfigProvider} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";


// Init VK  Mini App
bridge.send("VKWebAppInit").then(()=>{});

const rerenderTree = (state) => {
  ReactDOM.render(
      <ConfigProvider>
          <AdaptivityProvider>
              <App
                  state={state}
                  dispatch={store.dispatch.bind(store)}
              />
          </AdaptivityProvider>
      </ConfigProvider>

      , document.getElementById("root")
  );


  if (process.env.NODE_ENV === "development") {
    import("./eruda").then(({ default: eruda }) => {}); //runtime download
  }
}

rerenderTree(store.getState());
store.subscribe(() => {
    let state = store.getState()
    rerenderTree(state);
})
