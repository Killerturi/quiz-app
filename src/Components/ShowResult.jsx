import React from "react";
import quizdata from "./quizData";

const ShowResult = (props) => {
  return (
    <>
      <div className="resultBox">
        <h2>Completed!</h2>
        <h3>
          Your Score: {props.score} out of {quizdata.length * 2}
        </h3>
        <p>{props.massage}</p>
        <button onClick={props.handlePlayAgain}>play Again</button>
      </div>
    </>
  );
};

export default ShowResult;
