import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import store from "./redux/Store";

// Init VK  Mini App
bridge.send("VKWebAppInit");

const rerenderTree = (store) =>{
  ReactDOM.render(
      <App
          store={store}
      />
      , document.getElementById("root"));
  if (process.env.NODE_ENV === "development") {
    import("./eruda").then(({ default: eruda }) => {}); //runtime download
  }
}

rerenderTree(store);
store.subscriber(rerenderTree);



//f61e404a68946ab57c8df8f2c209b0951fdcfa5162878252efdb68483c10d4ae126cbd37c7afeb0d4d15d Токен
//ba3b76ecba3b76ecba3b76ec36ba4112a0bba3bba3b76ecdb94c5b0481a45b0e6da2805 сервисный ключ
//90863ba4161c1aba87333ede97616f49c848c9033008eda0abb76d30a3ca89e60c367ddcbdfd8b4eb5c6c ключ сообщества
//1b1b24a37d815b5c6db2d8bcea197a9bda252327d751cee1eca8b59e762909b95061f923f25337e88e442
//209480369=85cf29a79eee820080bed713566a0b52dd415d6d889f13d33641b8bca4799769b7f58dd9e9d6b616b2f7f токен сообщества
//85cf29a79eee820080bed713566a0b52dd415d6d889f13d33641b8bca4799769b7f58dd9e9d6b616b2f7f