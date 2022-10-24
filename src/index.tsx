import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App, { Task } from "./App";

const store = (tasks: Task[]) => {
  try {
    window.localStorage.tasks = JSON.stringify(tasks);
  } catch (e) {
    console.error("Could not save tasks, localstorage not avaialble");
  }
};

const retrieve = (key: string) => {
  try {
    return JSON.parse(window.localStorage[key]);
  } catch (e) {
    return undefined;
  }
};

const container = document.getElementById("root");

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App initialTasks={retrieve("tasks")} onStateChange={store} />
    </React.StrictMode>
  );
} else {
  document.open();
  document.writeln("<h1>Something has gone horribly wrong.</h1>");
  document.writeln(
    "We cannot find the HTML element we're meant to write the app into."
  );
  document.close();
}
