import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Rules from "./components/Rules";
import Home from "./components/Home";
import Trip from "./components/Trip";
import Course from "./components/Course";
import Signup from "./components/Signup";
import Info from "./components/Info";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="rules" element={<Rules />} />
          <Route path="trip" element={<Trip />} />
          <Route path="course" element={<Course />} />
          <Route path="signup" element={<Signup />} />
          <Route path="info" element={<Info />} />
        </Route>
      </Routes>
    </BrowserRouter>
    ,
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
