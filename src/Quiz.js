import "./App.css";

import React, { useEffect, useState } from "react";

import SetItemLS from "./helpers/LocalStorageSetItem";
import shuffle from "./helpers/Randomiser";

export default function Quiz(props) {
  const [counter, setCounter] = useState(0);
  const [toggle, setToggle] = useState(false);
  const { question, correct_answer, incorrect_answers } = props;

  useEffect(() => {
    if (toggle === true) {
      SetItemLS("increment", counter);
      setToggle(false);
    }
  }, [toggle]);
  function updateCounter(event) {
    event.target.innerText === correct_answer
      ? event.target.classList.add("correct-highlight")
      : alert("Incorrect");

    setTimeout(() => {
      setCounter(counter + 1);
      setToggle(true);
    }, "2000");
  }

  let answers = [];
  answers.push(correct_answer);
  incorrect_answers.map((item, i) => {
    return answers.push(item);
  });
  let options = shuffle(answers);

  const Options = (props) => {
    return (
      <p
        className="options correct"
        onClick={(event) =>
          event.target.innerText === correct_answer
            ? updateCounter(event)
            : null
        }
      >
        {props.items}
      </p>
    );
  };
  return (
    <>
      <div className="quiz-card-container">
        <div className="question-container">
          <h5>{question}</h5>
        </div>
        <div className="answer-container">
          {options.length > 2 && options
            ? options.map((items, i) => {
                return <Options items={items} key={i} />;
              })
            : null}
        </div>
      </div>
    </>
  );
}
