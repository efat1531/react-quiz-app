import { useEffect } from "react";

const Timer = ({ dispatch, time }) => {
  const minute = Math.floor(time / 60);
  const second = time % 60;
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);
  return (
    <div className="timer">{`${minute.toString().padStart(2, "0")}:${second
      .toString()
      .padStart(2, "0")}`}</div>
  );
};

export default Timer;
