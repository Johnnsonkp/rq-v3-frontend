import React, { useState, useEffect } from "react";
import "./App.css";

export default function SingleQuestion() {
  const initialQuizItem = [
    {
      question: "First quiz item",
      correct_answer: "First quiz answer",
      incorrect_answers: ["incorrect 1", "incorrect 2", "incorrect 3"],
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
    fetch("quiz.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => shuffle(data))
      .then((data) => setData(data));
  }, []);

  let answers = [];
  answers.push(data[0].correct_answer);
  data[0].incorrect_answers.map((item, i) => {
    return answers.push(item);
  });
  let options = shuffle(answers);

  const Options = (props) => {
    return (
      <p className="options correct" onClick={Click}>
        {props.items}
      </p>
    );
  };

  const Click = (event) => {
    event.target.innerText === data[0].correct_answer
      ? event.target.classList.add("correct-highlight")
      : alert("Incorrect");
  };
  const Reload = () => {
    window.location.reload()
  };

  return (
    <>
      <div className="single-mode-card-container">
        <div className="single-mode-card">
          <div className="single-mode-question">
            <h2>{data[0].question}</h2>
          </div>
          <div className="single-mode-answer">
            {options.length > 2 && options
              ? options.map((items, i) => {
                  return <Options items={items} key={i} />;
                })
              : null}
          </div>
        </div>
      </div>
      <button onClick={Reload}>Next</button>
    </>
  );
}