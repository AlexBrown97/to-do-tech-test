import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App
      initialNewTask={retrieve("newTask")}
      initialTasks={retrieve("tasks")}
      onState={store}
    />
  </React.StrictMode>
);
