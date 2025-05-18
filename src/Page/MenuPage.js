import React, { useState } from "react";
import styled from "styled-components";
import SwipeableViews from "react-swipeable-views";
import menu1 from "../Asset/Menu1.png";
import menu2 from "../Asset/Menu2.png";
import { useOrder } from "../contexts/OrderContext";
import { useMenu } from "../contexts/MenuContext";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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
  margin-bottom: 8vw;
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
  background-color: #00a86b;
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
    console.log("주문 내역은 : ", orders);
  };

  const decrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      updateOrder(index, newCount);
      console.log("주문 내역은 : ", orders);
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
  const { menuData } = useMenu();

  const handleOrderClick = () => {
    const totalOrders = orders.reduce((acc, cur) => acc + cur, 0); // 주문 총 수량 계산
    if (totalOrders > 0) {
      navigate("/menuCheck"); // 주문 수량이 0보다 크면 페이지 이동
    } else {
      alert("1개 이상을 선택해주세요!"); // 주문 수량이 0이면 경고 메시지 출력
    }
  };

  const ArrowButton = styled.button`
    position: absolute;
    top: 50%;
    ${(props) => (props.direction === "left" ? "left: 3%;" : "right: 3%;")}
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 50%;
    padding: 2vw;
    font-size: 6vw;
    cursor: pointer;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #00a86b;
  `;

  const SlideWrapper = styled.div`
    position: relative;
    width: 100%;
  `;

  return (
    <Container>
      <SlideWrapper>
        {index > 0 && (
          <ArrowButton direction="left" onClick={() => setIndex(index - 1)}>
            <FaArrowLeft />
          </ArrowButton>
        )}
        <SwipeableViews
          enableMouseEvents
          index={index}
          onChangeIndex={handleChangeIndex}
        >
          {menuData.map((item, idx) => (
            <Menu
              key={item.id}
              title={item.name}
              price={item.price}
              imageSrc={item.image}
              index={idx}
            />
          ))}
        </SwipeableViews>
        {index < menuData.length - 1 && (
          <ArrowButton direction="right" onClick={() => setIndex(index + 1)}>
            <FaArrowRight />
          </ArrowButton>
        )}
      </SlideWrapper>
      <DotsContainer>
        {menuData.map((_, idx) => (
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
