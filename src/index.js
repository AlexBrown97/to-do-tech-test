import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const store = (tasks, newTask) => {
  window.localStorage.tasks = JSON.stringify(tasks);
  window.localStorage.newTask = JSON.stringify(newTask);
};

const retrieve = (key) => {
  try {
    return JSON.parse(window.localStorage[key]);
  } catch (e) {
    return undefined;
  }
};

ReactDOM.render(
  <App
    initialNewTask={retrieve("newTask")}
    initialTasks={retrieve("tasks")}
    onState={store}
  />,
  document.getElementById("root")
);
registerServiceWorker();
