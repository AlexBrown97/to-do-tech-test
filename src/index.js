import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const store = (tasks) => {
  try {
    window.localStorage.tasks = JSON.stringify(tasks);
  } catch (e) {
    console.error("Could not save tasks, localstorage not avaialble");
  }
};

const retrieve = (key) => {
  try {
    return JSON.parse(window.localStorage[key]);
  } catch (e) {
    return undefined;
  }
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App initialTasks={retrieve("tasks")} onStateChange={store} />
  </React.StrictMode>
);
