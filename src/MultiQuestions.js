import "./App.css";

import React, { useEffect, useState } from "react";

import Quizcard from "./Quizcard";
import logo from "./logo.svg";
import shuffle from "./helpers/Randomiser";

function MultiQuestions({ count }) {
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [toggleForm, setToggleForm] = useState(false);
  const [incorrectAnswer1, setIncorrectAnswer1] = useState(" ");
  const [incorrectAnswer2, setIncorrectAnswer2] = useState(" ");
  const [incorrectAnswer3, setIncorrectAnswer3] = useState(" ");
  const [incorrectAnswerArr, setIncorrectAnswerArr] = useState([]);

  function submitFormToNotion() {
    // fetch("http://localhost:4000/submitFormToNotion", {
    fetch("http://localhost:5000/submitFormToNotion", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question,
        correctAnswer: correctAnswer,
        incorrectAnswer: [incorrectAnswer1, incorrectAnswer2, incorrectAnswer3],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success", data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  function onSubmt(e) {
    e.preventDefault();
    setIncorrectAnswerArr(incorrectAnswer1, incorrectAnswer2, incorrectAnswer3);
    submitFormToNotion();
  }

  const initialQuizItem = [
    {
      question: "First quiz item",
      correct_answer: "First quiz answer",
      incorrect_answers: ["incorrect 1", "incorrect 2", "incorrect 3"],
    },
  ];
  const [data, setData] = useState(initialQuizItem);
  const [counter, setCounter] = React.useState(0);

  const onClick = (event) => {
    if (event.target.classList.contains("card")) {
      return;
    }
    let clicked = event.target;
  };

  useEffect(() => {
    // fetch("quiz.json", {
    // fetch("http://localhost:4000/fetchNotionData", {
    fetch("http://localhost:5000/fetchNotionData", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => shuffle(data))
      .then((data) => setData(data))
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <div className="App">
      {data && data.length > 0 ? (
        <span className="quiz-container">
          <button
            style={{
              position: "absolute",
              bottom: "10px",
              right: "15px",
              padding: "35px 10px",
              borderRadius: "45px",
              cursor: "pointer",
            }}
            onClick={() => setToggleForm(!toggleForm)}
          >
            Add Card +
          </button>
          {toggleForm && (
            <form
              style={{
                cursor: "pointer",
                border: "1px solid red",
                borderRadius: "15px",
                width: "55%",
                margin: "auto",
              }}
            >
              <h3>Add New Card</h3>
              <div className="addCard">
                <p style={{ textAlign: "left", padding: "5px 35px" }}>
                  Input your question here
                </p>
                <input
                  type="text"
                  id="question"
                  onChange={(e) => setQuestion(e.target.value)}
                  style={{ width: "90%" }}
                />
                <p style={{ textAlign: "left", padding: "5px 35px" }}>
                  The correct answer
                </p>
                <input
                  type="text"
                  id="correctAnswer"
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  style={{ width: "90%" }}
                />
                <div>
                  <p style={{ textAlign: "left", padding: "5px 35px" }}>
                    The incorrect answer
                  </p>
                  <input
                    type="text"
                    id="incorrectAnswer"
                    onChange={(e) => setIncorrectAnswer1(e.target.value)}
                    style={{ width: "90%" }}
                  />
                  <br></br>
                  <br></br>
                  <input
                    type="text"
                    id="incorrectAnswer"
                    onChange={(e) => setIncorrectAnswer2(e.target.value)}
                    style={{ width: "90%" }}
                  />
                  <br></br>
                  <br></br>
                  <input
                    type="text"
                    id="incorrectAnswer"
                    onChange={(e) => setIncorrectAnswer3(e.target.value)}
                    style={{ width: "90%" }}
                  />
                </div>
              </div>
              <button onClick={(e) => onSubmt(e)}>Submit</button>
            </form>
          )}
          <Quizcard data={data} />
        </span>
      ) : (
        <p>
          Loading...
          <img src={logo} className="App-logo" alt="logo" />
        </p>
      )}
    </div>
  );
}

export default MultiQuestions;
