const NexTButton = ({ dispatch, answer, index, numOfQuestions }) => {
  if (answer === null) {
    return null;
  }
  if (index < numOfQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "nextQuestion" });
        }}
      >
        Next
      </button>
    );
  }
  return (
    <button
      className="btn btn-ui"
      onClick={() => {
        dispatch({ type: "finished" });
      }}
    >
      Next
    </button>
  );
};

export default NexTButton;
