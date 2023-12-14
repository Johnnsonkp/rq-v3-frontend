import "./App.css";

import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";

import LongResponse from "./LongResponse";
import MultiQuestions from "./MultiQuestions";
import Nav from "./Nav";
import SingleQuestion from "./SingleQuestion";
import { UserProvider } from "./index.jsx";
import logo from "./logo.svg";

function App() {
  const [counter, setCounter] = useState(0);
  const [toggle, setToggle] = useState(false);
  window.addEventListener("storage", () => {
    console.log("changes to local storage");
    setToggle(true);
  });
  window.addEventListener("load", () => {
    alert("insert loading page here...");
  });
  useEffect(() => {
    if (toggle === true) {
      setCounter(JSON.parse(window.localStorage.getItem("increment")) || 0);
      setToggle(false);
    }
  }, [toggle, counter]);

  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Nav counter={counter} />
          <div className="content">
            <Routes>
              <Route path="/" element={<MultiQuestions />} />
              <Route path="/MultiQuestions" element={<MultiQuestions />} />
              <Route path="/SingleQuestion" element={<SingleQuestion />} />
              <Route
                path="/long-response-questions"
                element={<LongResponse />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
