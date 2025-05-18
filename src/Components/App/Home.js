import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 0;
  font-family: "Arial", sans-serif;
`;

const MainText = styled.div`
  font-size: 4.2667vw;
  font-weight: 900;
  margin-bottom: 8vw;
  margin-top: 14vw;
`;

const Message = styled.p`
  font-size: 3.7333vw; // 반응형 글자 크기
  text-align: center;
  margin: 5.3333vw;
  margin-bottom: 1.8667vw;
  color: #333;
`;

const Button = styled.button`
  width: 60vw;
  padding: 2vw; // 반응형 패딩
  margin: 2.6667vw;
  background-color: #00a86b;
  color: white;
  border: none;
  font-size: 4vw; // 반응형 글자 크기
  cursor: pointer;
  border-radius: 41.5px;
  border: 1px solid #00a86b; // 초록색 태두리

  &:hover {
    background-color: #00a86b;
  }
`;

const OrderButton = styled(Button)`
  background-color: white; // 흰색 배경
  color: #00a86b; // 초록색 글자
  border: 1px solid #00a86b; // 초록색 태두리

  &:hover {
    background-color: #f0f0f0; // 호버 시 배경 색 변경
  }
`;

const TextLogo = styled.img`
  width: 100%;
  height: auto;
  margin-top: 10vw;
`;

const Modal = styled.button`
  position: fixed;
  top: 96%;
  left: 92%;
  transform: translate(-50%, -50%);
  display: "block";
  border: none;
  background-color: transparent;
`;

const NewQuizImg = styled.img`
  width: 45px;
  height: auto;
`;

const TText = styled.div`
  color: var(--Color-2, #363636);
  text-align: center;
  font-family: "Noto Sans KR";
  font-size: 2.5vw;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  margin-bottom: 12vw;
`;

const TTText = styled.div`
  color: var(--Color-2, #363636);
  margin-top: 10vw;
  text-align: center;
  font-family: "Noto Sans KR";
  font-size: 1.5vw;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  margin-bottom: 12vw;
`;

function HomePage() {
  const navigate = useNavigate();

  return (
    <Container>
      <MainText>PARD 장사를 할까요~말까요~ </MainText>
      <Message>
        PARD가 <br />
        더 쾌적한 동아리 운영을 위해 <br />
        장사를 진행합니다!
      </Message>
      <TText>
        <br />
        일정 : 5월 20일(화) ~ 5월 22일(목)
        <br /> 장소: 한동대 학생회관 앞
      </TText>
      <OrderButton onClick={() => navigate("/order")}>주문하기</OrderButton>
      {/* <Button onClick={() => navigate("/order-CheckMan")}>퀴즈풀기</Button> */}
      <TextLogo src={require("../../Asset/logo.png")} />
      {/* <Modal onClick={() => navigate("/vote")}>
        <NewQuizImg src={require("../../Asset/notify.png")} />
      </Modal> */}

      <TTText>Copyright 2024. PARD. All rights reserved.</TTText>
    </Container>
  );
}

export default HomePage;
