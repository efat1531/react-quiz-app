import { useEffect, useReducer } from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Loading from "./Components/Loader";
import Error from "./Components/Error";
import Start from "./Components/Start";
import Question from "./Components/Question";
import Progress from "./Components/Progress";
import Finished from "./Components/Finished";
import NextButton from "./Components/NextButton";
import Footer from "./Components/Footer";
import Timer from "./Components/Timer";

const initialState = {
  questions: [],
  // Loading, Error, Ready, Active, Finished
  status: "loading",
  index: 0,
  answer: null,
  point: 0,
  time: 10,
  highScore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "answerQuestion":
      const isCorrect =
        state.questions[state.index].correctOption === action.payload;
      return {
        ...state,
        answer: action.payload,
        point: isCorrect
          ? state.point + state.questions[state.index].points
          : state.point,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.point > state.highScore ? state.point : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        highScore: state.highScore,
        status: "ready",
        questions: state.questions,
      };
    case "tick":
      return {
        ...state,
        time: state.time - 1,
        status: state.time === 0 ? "finished" : "active",
      };

    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [
    { questions, status, index, answer, point, highScore, time },
    dispatch,
  ] = useReducer(reducer, initialState);
  const maxPossiblePoint = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );
  useEffect(() => {
    fetch("http://localhost:2025/questions").then((response) => {
      response
        .json()
        .then((data) => {
          dispatch({ type: "dataReceived", payload: data });
        })
        .catch(() => {
          dispatch({ type: "dataFailed" });
        });
    });
  }, []);
  const numOfQuestions = questions.length;
  return (
    <div className="App">
      <Header />
      <Main>
        {status === "loading" && <Loading />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Start numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index + 1}
              numOfQuestions={numOfQuestions}
              point={point}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer dispatch={dispatch} time={time} />
              <NextButton
                dispatch={dispatch}
                index={index}
                numOfQuestions={numOfQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <Finished
            point={point}
            maxPossiblePoint={maxPossiblePoint}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
