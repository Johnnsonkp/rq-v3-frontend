import "./App.css";

import React, { useEffect, useState } from "react";

import LoadingScreen from "./LoadScreen";
import LongRespForm from "./LongRespForm";

export default function LongResponse() {
  const [loadscreenToggle, setLoadScreenToggle] = useState(false);
  const initialQuizItem = [
    {
      question: "First quiz item",
    },
  ];
  const [data, setData] = useState(initialQuizItem);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  useEffect(() => {
    fetch("longresponse.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => shuffle(data))
      .then((data) => setData(data));
  }, []);
  const Reload = () => {
    // window.location.reload();
    setLoadScreenToggle(true);
  };

  function PageLoadScreen() {
    const DefaultPage = () => {
      return (
        <>
          <div className="long-response-container">
            <div className="long-response-card">
              <LongRespForm
                question={data[0].question}
                correct_answer={data[0].correct_answer}
              />
            </div>
            <button className="next-btn" onClick={Reload}>
              Next
            </button>
          </div>
        </>
      );
    };
    return <></>;
  }

  return (
    <>
      <div className="long-response-container">
        <div className="long-response-card">
          <LongRespForm
            question={data[0].question}
            correct_answer={data[0].correct_answer}
          />
        </div>
        <button className="next-btn" onClick={Reload}>
          Next
        </button>
      </div>
    </>
  );
}
