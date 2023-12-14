import "./App.css";

import React, { useEffect, useReducer, useState } from "react";

export const ScoreBoard = (props) => {
  const [conterUpdate, setCounterUpdate] = useState();
  const [toggle, setToggle] = useState(false);

  function localValue(value) {
    let count = JSON.parse(window.localStorage.getItem("increment")) || 0;
    return <span>{count}</span>;
  }

  window.addEventListener("storage", () => {
    console.log("changes to local storage ScoreBoard.js");
    setToggle(true);
  });

  return (
    <div className="scoreBoard">
      <span>Score: {toggle ? props.counter + 1 : 0}</span>
    </div>
  );
};
