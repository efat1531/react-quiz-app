const Progress = ({ index, numOfQuestions, point, answer }) => {
  return (
    <header className="progress">
      <progress
        value={answer != null ? index : index - 1}
        max={numOfQuestions}
      ></progress>
      <p>
        Question <strong>{index}</strong> of <strong>{numOfQuestions}</strong>
      </p>
      <p>
        Points: <strong>{point}</strong>
      </p>
    </header>
  );
};

export default Progress;
