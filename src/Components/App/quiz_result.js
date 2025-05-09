import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { ScoreContext } from "../../contexts/ScoreContext";
import { useNavigate } from "react-router-dom";

const getColor = (score) => {
  if (score < 3) return "#F04923";
  if (score < 5) return "#FFBF00";
  return "#0067A5";
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  margin-bottom: 5vw;
`;

const UrScore = styled.div`
  font-size: 9.3333vw;
  font-weight: 900;
  margin-top: 10.6667vw;
  margin-bottom: 13.3333vw;
`;

const ResultContainer = styled.div`
  color: white;
  background-color: ${(props) => getColor(props.score)};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60vw;
  height: 60vw;
  font-size: 18.6667vw;
  font-weight: 900;
  padding-top: 2.6667vw;
`;

const ScoreText = styled.img`
  width: 60%;
  height: auto;
  margin-top: 8vw;
`;

const GoodNews = styled.img`
  width: 50%;
  height: auto;
  margin-top: 8vw;
`;

const FlexDiv = styled.div`
  width: 80%;
  margin-top: 13vw;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Button = styled.button`
  width: 60vw;
  padding: 2vw; // 반응형 패딩
  margin: 2.6667vw;
  background-color: #00a86b;
  color: white;
  border: none;
  font-size: 6.4vw; // 반응형 글자 크기
  cursor: pointer;
  border-radius: 41.5px;

  &:hover {
    background-color: #00a86b;
  }
`;

const LastButton = styled.button`
  width: 80%;
  padding: 2vw; // 반응형 패딩
  margin: 2.6667vw;
  background-color: #00a86b;
  color: white;
  border: none;
  font-size: 6.4vw; // 반응형 글자 크기
  cursor: pointer;
  border-radius: 41.5px;

  &:hover {
    background-color: #00a86b;
  }
`;

const OrderButton = styled(Button)`
  background-color: white; // 흰색 배경
  color: #00a86b; // 초록색 글자
  border: 2px solid #00a86b; // 초록색 태두리

  &:hover {
    background-color: #f0f0f0; // 호버 시 배경 색 변경
  }
`;

const QuizResult = () => {
  const { score, setScore } = useContext(ScoreContext);
  const navigate = useNavigate();
  const [showRetry, setShowRetry] = useState(true);

  useEffect(() => {
    // 로컬 스토리지에서 'retry' 값을 확인
    const retry = localStorage.getItem("retry");
    // 'retry' 값이 있다면 버튼을 숨김
    if (retry) {
      setShowRetry(false);
    }
  }, []);

  const handleClick = () => {
    // 'retry' 값을 로컬 스토리지에 저장
    localStorage.setItem("retry", "true");
    // 버튼을 숨김
    setShowRetry(false);
    // 페이지를 '/quiz'로 이동
    navigate("/quiz");
    setScore(0);
  };

  return (
    <Div>
      <UrScore>당신의 점수는?</UrScore>
      <ResultContainer score={score}>
        <p>{score}/5</p>
      </ResultContainer>
      {score < 3 ? (
        <ScoreText src={require("../../Asset/score1.png")} />
      ) : score < 5 ? (
        <ScoreText src={require("../../Asset/score2.png")} />
      ) : (
        <ScoreText src={require("../../Asset/score3.png")} />
      )}
      <GoodNews src={require("../../Asset/goodNews.png")} />
      {showRetry && (
        <FlexDiv>
          <OrderButton onClick={handleClick}>재도전!</OrderButton>
          <Button onClick={() => navigate("/order")}>주문하기</Button>
        </FlexDiv>
      )}
      {!showRetry && (
        <LastButton onClick={() => navigate("/order")}>주문하기</LastButton>
      )}
    </Div>
  );
};

export default QuizResult;
