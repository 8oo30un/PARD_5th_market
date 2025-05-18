import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
`;

const Message = styled.h1`
  font-family: "Noto Sans", sans-serif;
  font-size: 24px;
  color: #00a86b;
  margin-bottom: 20px;
  text-align: center;
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: #00a86b;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #008f5a;
  }
`;

function OrderFinishedPage() {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/qr");
  };

  return (
    <Container>
      <Message>주문이 성공적으로 완료되었습니다!</Message>
      <Button onClick={handleReturn}>주문 페이지로 돌아가기</Button>
    </Container>
  );
}

export default OrderFinishedPage;
