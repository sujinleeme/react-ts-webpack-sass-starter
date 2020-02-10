import "core-js";
import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import Container from "./container";

const render = (rootComponent: JSX.Element) => {
  ReactDOM.render(<AppContainer>{rootComponent}</AppContainer>, document.getElementById("app"));
};

const RootComponent = Container;

render(<RootComponent />);

if (module.hot) {
  module.hot.accept("./container", () => {
    render(require("./container"));
  });
}
