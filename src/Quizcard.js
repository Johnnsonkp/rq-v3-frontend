import React from "react";
import Quiz from "./Quiz";
import "./App.css";

export default function Quizcard(props) {
  return (
    <div className="card">
      {props.data.map(
        ({ question, correct_answer, incorrect_answers }, index) => (
          <Quiz
            key={index}
            question={question}
            correct_answer={correct_answer}
            incorrect_answers={incorrect_answers}
          />
        )
      )}
    </div>
  );
}
