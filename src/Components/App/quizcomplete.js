import React from "react";
import styled from "styled-components";
import checkMark from "../../Asset/check_icon.png";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #00A86B; 
`;

const CheckIcon = styled.img`
  width: 16%; // Adjust size as needed
  margin-bottom: 10.6667vw;

`;

const Message = styled.div`
  color: white;
  font-size: 4.2667vw;
  text-align: center;
  padding: 0 5.3333vw;
`;

const Button = styled.button`
  background-color: white;
  width: 60%;
  color: #00A86B;
  font-size: 4.2667vw;
  padding: 2.6667vw 5.3333vw;
  border: none;
  border-radius: 5.3333vw;
  margin-top: 16.0000vw;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #f0f0f0;
  }
`;

function QuizCompletionScreen() {
  const navigate = useNavigate();

  const handleRestart = () => {
    // Implement restart logic
    console.log("Restart or review quiz");
    navigate("/quiz-result");
  };

  return (
    <Container>
      <CheckIcon src={checkMark} alt="Check Mark" />
      <Message>모든 문제를 다 푸셨습니다!</Message>
      <Message> 점수를 확인하러 가실까요? </Message>
      <Button onClick={handleRestart}>점수 확인하러 가기</Button>
    </Container>
  );
}

export default QuizCompletionScreen;
