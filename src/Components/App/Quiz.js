import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import questions from "../../model/Question"; // 문제 목록 가져오기
import ProgressComponent from "./quizNum";
import { useNavigate } from "react-router-dom";
import { ScoreContext } from "../../contexts/ScoreContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Arial", sans-serif;
  margin-top: 5.3333vw;
`;

const QuestionText = styled.div`
  font-size: 6.4000vw;
  width: 80%;
  word-break: break-word;
  margin-bottom: 8.0000vw;
  font-family: 'Noto Sans', sans-serif;
`;

const QuestionNum = styled.div`
  font-size: 6.4000vw;
  font-weight: 900;
  margin-bottom: 5.3333vw;
`;

const Button = styled.button`
  width: 80%;
  padding: 2.6667vw;
  margin: 2.6667vw;
  background-color: #f0f0f0;
  border: 1px solid #f0f0f0;
  border-radius: 5.3333vw;
  font-size: 4.2667vw;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)}; 
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')}; 

  &:hover {
    background-color: #f0f0f0;
  }

  &.selected {
    border-color: green;
  }
`;

const NextButton = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 50%;
  width: 20%;
  height: 20%;
  background-color: transparent;
  margin-right: 5.3333vw;

  img {
    width: 100%;
    height: 100%;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${(props) => (props.show ? "block" : "none")};
`;

const ResultIcon = styled.img`
  width: 100%;
  height: auto;
  margin-top: 26.6667vw;
`;

const ExplanationPage = styled.div`
  font-size: 4.2667vw;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const FlexDiv = styled.div`
  width: 100%;
  margin-top: 26.6667vw;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ExplanationText = styled.div`
  margin-top: 16.0000vw;
  width: 80%;
  font-size: 5.3333vw;
  word-break: break-word;
  line-height: 150%; 
`;

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function selectQuestions() {
  let shuffledQuestions = shuffleArray(questions);
  const highDifficultyQuestions = shuffledQuestions.filter(
    (q) => q.difficulty === "high"
  );
  const lowDifficultyQuestions = shuffledQuestions.filter(
    (q) => q.difficulty === "low"
  );

  let selectedQuestions = [];
  if (highDifficultyQuestions.length > 0) {
    selectedQuestions.push(highDifficultyQuestions[0]); // 최소 하나의 high difficulty 문제 추가
  }

  // 나머지 문제들을 추가하여 총 5문제가 되도록 함
  selectedQuestions = selectedQuestions.concat(
    lowDifficultyQuestions.slice(0, 5 - selectedQuestions.length)
  );
  return selectedQuestions;
}

function QuizApp() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const navigate = useNavigate();
  const { score, setScore } = useContext(ScoreContext);


  useEffect(() => {
    setSelectedQuestions(selectQuestions());
  }, []);

  useEffect(() => {
    if (selectedAnswer !== null) {
      setShowModal(true);
      const timer = setTimeout(() => {
        setShowModal(false);
        setShowQuiz(true);
        setSelectedAnswer(null);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [selectedAnswer, selectedQuestions.length]);

  if (!selectedQuestions.length) return <div>Loading...</div>;

  const question = selectedQuestions[currentQuestionIndex];

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    // Update correct answers count if the selected answer is correct
    if (answer === question.answer) {
      setCorrectAnswersCount((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === selectedQuestions.length - 1) {
      // This is the last question, log the results
      console.log(
        `You answered ${correctAnswersCount} out of ${selectedQuestions.length} questions correctly.`
      );
      setScore(correctAnswersCount);
      navigate("/quiz-finish");
    }

    setCurrentQuestionIndex(
      (current) => (current + 1) % selectedQuestions.length
    );
    console.log("점수는 : ",score);
    setShowModal(false);
    setShowQuiz(false);
  };


  return (
    <Container>
      <ProgressComponent step={currentQuestionIndex} />
      {!showQuiz ? (
        <>
          <QuestionNum>Q{currentQuestionIndex + 1}.</QuestionNum>
          <QuestionText>{question.question}</QuestionText>
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswerClick(option)}
              className={selectedAnswer === option ? "selected" : ""}
              disabled={showModal}  
            >
              {option}
            </Button>
          ))}
          <Modal show={showModal}>
            {selectedAnswer === question.answer ? (
              <ResultIcon src={require("../../Asset/O_icon.png")} />
            ) : (
              <ResultIcon src={require("../../Asset/X_icon.png")} />
            )}
          </Modal>
        </>
      ) : (
        <>
          <ExplanationPage>
            <QuestionNum>정답.</QuestionNum>
            <ExplanationText>{question.explain}</ExplanationText>
          </ExplanationPage>
          <FlexDiv>
            <NextButton onClick={handleNextQuestion}>
              <img src={require("../../Asset/Next_Icon.png")} />
            </NextButton>
          </FlexDiv>
        </>
      )}
    </Container>
  );
}

export default QuizApp;
