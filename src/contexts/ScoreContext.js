import React from "react";

export const ScoreContext = React.createContext();

export function ScoreProvider({ children }) {
  const [score, setScore] = React.useState(
    () => window.sessionStorage.getItem("score") || ""
  );
  
  React.useEffect(() => {
    window.sessionStorage.setItem("score", score);
  }, [score]);
  
  console.log("현재 score: ", score);
  
  return (
    <ScoreContext.Provider value={{ score, setScore }}>
      {children}
    </ScoreContext.Provider>
  );
}
