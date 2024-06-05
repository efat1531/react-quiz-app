const Question = ({ question, answer, dispatch }) => {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, index) => {
          return (
            <button
              className={`btn btn-option ${index === answer ? "answer" : ""} ${
                answer === null
                  ? ""
                  : index === question.correctOption
                  ? "correct"
                  : "wrong"
                // console.log(answer, question.correctOption)
              }`}
              disabled={answer !== null}
              key={option}
              onClick={() => {
                dispatch({ type: "answerQuestion", payload: index });
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
