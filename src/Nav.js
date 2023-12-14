import React, { setState, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { ScoreBoard } from "./ScoreBoard";
import logo from "./logo.svg";
import { useAppState } from "./AppState.jsx";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";

let newCount = [];

export default function Nav(props) {
  const [counter, setCounter] = useState(0);
  const { buttonProps, itemProps, isOpen } = useDropdownMenu(2);
  console.log("nav.js", props.counter);

  function resetLS() {
    window.localStorage.removeItem("increment");
    window.location.reload();
  }

  const style = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textDecoration: "none",
    color: "#fff",
  };
  return (
    <header>
      <div className="header-container">
        <div className="TitleBox">
          <Link style={style} to="/">
            <img src={logo} className="App-logo title-logo" alt="logo" />
            <h3>React Quiz</h3>
          </Link>
        </div>
        <div className="drop-down">
          <nav>
            <button {...buttonProps}>Question Mode</button>
            <div className={isOpen ? "visible" : ""} role="menu">
              <Link
                className="inner-nav"
                {...itemProps[1]}
                to="/SingleQuestion"
              >
                Single Question Mode
              </Link>
              <Link
                className="inner-nav"
                {...itemProps[1]}
                to="/MultiQuestions"
              >
                Multi Question Mode
              </Link>
              <Link
                className="inner-nav"
                {...itemProps[1]}
                to="/long-response-questions"
              >
                Long Response Mode
              </Link>
            </div>
          </nav>
        </div>

        <button className="resetBtn" onClick={() => resetLS()}>
          Reset
        </button>
        <ScoreBoard counter={props.counter} />
      </div>
    </header>
  );
}
