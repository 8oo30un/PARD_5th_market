import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const QRPage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  const firebaseURL = "https://pardmarket-ba84c.web.app";
  const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${firebaseURL}`;

  return (
    <div style={{ textAlign: "center", paddingTop: "100px" }}>
      <h1>앱 접속 QR코드</h1>
      {!isLoaded && <Skeleton />}
      <img
        src={qrURL}
        alt="QR Code to Firebase App"
        onLoad={() => setIsLoaded(true)}
        style={{ display: isLoaded ? "inline" : "none" }}
      />
      <p>이 QR코드를 스캔하면 앱으로 이동합니다.</p>
      <div onClick={() => navigate("/home")}>
        <OrderButton>주문 화면</OrderButton>
      </div>
    </div>
  );
};

const OrderButton = styled.button`
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

const Skeleton = styled.div`
  width: 300px;
  height: 300px;
  background-color: #eee;
  border-radius: 8px;
  margin: 0 auto;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      background-color: #eee;
    }
    50% {
      background-color: #ddd;
    }
    100% {
      background-color: #eee;
    }
  }
`;

export default QRPage;
