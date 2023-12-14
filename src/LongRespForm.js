import React, { useState, useEffect } from "react";
import "./App.css";

export default function LongRespForm(props) {
  const [textValue, setTextValue] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    document.querySelector(".hidden-answer").style.display = "block";
  };

  return (
    <form onSubmit={onSubmit}>
      <label className="long-response-question">
        <h2>{props.question}</h2>
      </label>
      <textarea
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
      ></textarea>
      <textarea
        className="hidden hidden-answer"
        value={props.correct_answer}
      ></textarea>
      <input className="submit-btn" type="submit" value="Submit" />
    </form>
  );
}
