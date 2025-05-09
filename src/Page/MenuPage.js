import React, { useState } from "react";
import styled from "styled-components";
import SwipeableViews from "react-swipeable-views";
import samSo from "../Asset/samSo.png";
import samBee from "../Asset/samBee.png";
import { useOrder } from "../contexts/OrderContext";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Arial", sans-serif;
  padding-top: 8vw;
  margin-bottom: 5vw;
`;

const MainText = styled.div`
  font-size: 8vw;
  font-weight: 900;
  margin-bottom: 18vw;
`;

const CountNume = styled.div`
  font-size: 6.6667vw;
  font-weight: 500;
`;

const SlideContainer = styled.div`
  background-color: #fff;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 8vw;
`;

const Image = styled.img`
  width: 60%;
  height: auto;
  border-radius: 50%;
  margin-bottom: 5.3333;
`;

const Counter = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* margin: 5.3333vw; */
  width: 80%;
`;

const Button = styled.button`
  width: 21.3333vw;
  height: 21.3333vw;
  border: none;
  background-color: #f8f8f8;
  font-size: 6.4vw;
  border-radius: 7.2vw;
`;

const Price = styled.div`
  text-align: center;
  font-size: 6.6667vw;
  font-weight: 900;
  color: #333;
  margin: 10px 0;
`;

const OrderButton = styled.button`
  width: 90%;
  padding: 15px;
  background-color: #00A86B;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 4.8vw;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const Dot = styled.span`
  padding: 5px;
  cursor: pointer;
  border-radius: 50%;
  background: ${(props) => (!props.isActive ? "#D9D9D9" : "#00A86B")};
`;

const DotsContainer = styled.div`
  display: flex;
  width: 10%;
  justify-content: space-around;
  margin-bottom: 30px;
`;

const Menu = ({ title, price, imageSrc, index }) => {
  const { orders, updateOrder } = useOrder();
  const [count, setCount] = useState(orders[index]);
  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    updateOrder(index, newCount);
    console.log("주문 내역은 : ",orders);
  };

  const decrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      updateOrder(index, newCount);
      console.log("주문 내역은 : ",orders);
    }
  };



  return (
    <SlideContainer>
      <MainText>{title}</MainText>
      <Image src={imageSrc} alt={title} />
      <Counter>
        <Button onClick={decrement}>-</Button>
        <CountNume>{count}</CountNume>
        <Button onClick={increment}>+</Button>
      </Counter>
      <Price>{price}원</Price>
    </SlideContainer>
  );
};

function MenuPage() {
  const [index, setIndex] = useState(0);
  const handleChangeIndex = (index) => {
    setIndex(index);
  };
  const navigate = useNavigate();
  const { orders } = useOrder();  

  const handleOrderClick = () => {
    const totalOrders = orders.reduce((acc, cur) => acc + cur, 0);  // 주문 총 수량 계산
    if (totalOrders > 0) {
      navigate("/menuCheck");  // 주문 수량이 0보다 크면 페이지 이동
    } else {
      alert("1개 이상을 선택해주세요!");  // 주문 수량이 0이면 경고 메시지 출력
    }
  };



  return (
    <Container>
      <SwipeableViews
        enableMouseEvents
        index={index}
        onChangeIndex={handleChangeIndex}
      >
        <Menu title="삼쏘(소세지임)" price="5,300" imageSrc={samSo} index={0}/>
        <Menu title="비쌈(별로 안비싸요)" price="5,300" imageSrc={samBee} index={1}/>
      </SwipeableViews>
      <DotsContainer>
        {[0,1].map((idx) => (
          <Dot
            key={idx}
            isActive={index === idx}
            onClick={() => setIndex(idx)}
          />
        ))}
      </DotsContainer>
      <OrderButton onClick={handleOrderClick}>주문하기</OrderButton>
    </Container>
  );
}

export default MenuPage;
