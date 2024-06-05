const Finished = ({ point, maxPossiblePoint, highScore, dispatch }) => {
  const percentage = (point / maxPossiblePoint) * 100;
  let emoji = "";
  if (percentage === 100) {
    emoji = "🎉";
  } else if (percentage >= 80) {
    emoji = "👏";
  } else if (percentage >= 60) {
    emoji = "🙂";
  } else {
    emoji = "😢";
  }
  return (
    <>
      <p className="result">
        <span>{emoji}</span> You have scored <strong>{point}</strong> out of{" "}
        <strong>{maxPossiblePoint}</strong> (
        <strong>{percentage.toFixed(2)}%</strong>).
      </p>
      <p className="highscore">(High Score: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        Restart
      </button>
    </>
  );
};

export default Finished;
