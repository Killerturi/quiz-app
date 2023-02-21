import React, { useState } from "react";
import quizdata from "./quizData";
import ShowResult from "./ShowResult";

const Home = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [click, setClick] = useState(false);
  const [massage, setMassage] = useState("");

  const answerHandle = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 2);
      setResult(result + 1);
    }
    setClick(true);
  };

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizdata.length) {
      setCurrentQuestion(nextQuestion);
      setClick(false);
    } else {
      setShowScore(true);
      if (score == 0) {
        setMassage("You'r: Stupid");
      } else if (score <= 4) {
        setMassage("You'r: Average");
      } else if (score <= 8) {
        setMassage("You'r: Smart");
      } else {
        setMassage("You'r: Genius");
      }
    }
  };

  const handlePlayAgain = () => {
    setShowScore(false);
    setScore(0);
    setResult(0);
    setCurrentQuestion(0);
    setClick(false);
    setMassage("");
  };
  return (
    <>
      <h1>
        <u>
          <i>React-Quiz</i>
        </u>
      </h1>
      <div className="container">
        <div className="ring">🐙</div>
        {showScore ? (
          <ShowResult
            score={score}
            handlePlayAgain={handlePlayAgain}
            massage={massage}
          />
        ) : (
          <>
            <div className="questionSection">
              <div className="left">
                <p>▶{quizdata[currentQuestion].question}</p>
              </div>
              <div className="right">
                {quizdata[currentQuestion].answers.map((item, index) => {
                  return (
                    <div key={index}>
                      <button
                        disabled={click}
                        // className="option"
                        className={`option ${
                          click & item.isCorrect
                            ? "correct"
                            : `${
                                (click & item.isCorrect === false)
                                  ? "wrong"
                                  : "option"
                              }`
                        }`}
                        onClick={() => answerHandle(item.isCorrect)}
                      >
                        {item.option}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="footer">
              <button
                disabled={currentQuestion == 0 ? !click : ""}
                onClick={handlePlayAgain}
              >
                Quit
              </button>
              <span>
                {currentQuestion + 1} / {quizdata.length}
              </span>
              <button disabled={!click} onClick={handleNext}>
                {currentQuestion + 1 === quizdata.length ? "Submit" : "next"}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
