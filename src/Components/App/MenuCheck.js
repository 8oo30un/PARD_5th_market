import styled from "styled-components";
import { useOrder } from "../../contexts/OrderContext";
import React, { useState, useEffect, useContext } from "react";
import { ScoreContext } from "../../contexts/ScoreContext";
import { useNavigate } from "react-router-dom";
import { dbService } from "../../fbase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { PacmanLoader } from "react-spinners";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f3f7f6;
  padding-bottom: 5vw;
`;

const TitleText = styled.div`
  font-size: 5.8667vw;
  line-height: 140%;
  font-weight: 900;
  margin-top: 8vw;
  margin-bottom: 8.2667vw;
`;

const WhiteBackBox = styled.div`
  width: 78vw;
  height: 76vw;
  padding: 5.3333vw;
  border-radius: 5.3333vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 6.4vw;
  background: #fefefe;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const NameText = styled.div`
  color: #000;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 4.5333vw;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  margin-bottom: 9vw;
`;

const FlexDiv = styled.div`
  width: ${(props) => props.per || 100}%;
  display: flex;
  flex-direction: ${(props) => props.col || "row"};
  align-items: ${(props) => props.ali || "center"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  margin-bottom: ${(props) => props.bottom || 0}vw;
`;

const MenuImg = styled.img`
  width: 20vw;
  height: 20vw;
  margin-right: 3.4667vw;
`;

const Menuname = styled.div`
  color: #000;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 3.7333vw;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  margin-bottom: 4vw;
`;

const MenuNum = styled.div`
  color: #000;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 3.7333vw;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

const Price = styled.div`
  color: #000;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 4.8vw;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
`;

const PriceCheck = styled.div`
  color: ${(props) => props.color || "#000"};
  text-align: ${(props) => props.align || "start"};
  font-family: "Noto Sans";
  font-size: ${(props) => props.size || 20}px;
  font-style: normal;
  font-weight: ${(props) => props.weight || 600};
  width: ${(props) => props.per}%;
  margin-bottom: ${(props) => props.bottom || 0}vw;
`;

const Hr = styled.hr`
  width: 80%;
  height: 0.8px;
  background-color: #8b8b8b;
  margin-top: 5.8667vw;
  margin-bottom: 3.7333vw;
  border: none;
`;

const Button = styled.button`
  width: 80%;
  padding: 2vw; // 반응형 패딩
  margin-bottom: 2.9333vw;
  background-color: #00a86b;
  color: white;
  border: none;
  color: #fff;

  font-family: "Noto Sans";
  font-size: 6.4vw;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  cursor: pointer;
  border-radius: 5.3333vw;

  &:hover {
    background-color: #00a86b;
  }
`;

function MenuCheck() {
  const { orders, setOrders } = useOrder();
  const [price, SetPrice] = useState(0);
  const [sale, SetSale] = useState(0);
  const { score } = useContext(ScoreContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let extra = 0;
    if (score == 5) {
      extra = 700;
    } else if (score >= 3) {
      extra = 500;
    }
    SetPrice(orders[0] * 5300 + orders[1] * 5300);
    SetSale(extra * orders[0] + extra * orders[1]);

    console.log("가격 : ", price, "sale : ", sale);
  }, []);

  const handleOnSubmit = async () => {
    console.log("주문 시작");
    setIsLoading(true);

    const orderData = {
      time: new Date(),
      menuCount: orders,
      price: price,
      phoneNumber: "",
      status: 0,
    };

    try {
      const docRef = await addDoc(collection(dbService, "order"), orderData);
      console.log("Document written with ID: ", docRef.id);

      await updateDoc(doc(dbService, "order", docRef.id), {
        id: docRef.id
      });
      navigate("/order-submit");
      localStorage.setItem("id", docRef.id);
      localStorage.setItem("price", price-sale);
      SetPrice(0);
      SetSale(0);
      setOrders([0, 0]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  const override = {
    display: "flex",
    margin: "0 auto",
    marginTop: "300px",
    borderColor: "#00a86b",
    textAlign: "center",
  };

  if (isLoading) {
    return (
      <div>
        <PacmanLoader
          color="#00a86b"
          loading={isLoading}
          cssOverride={override}
          size={50}
        />
      </div>
    );
  }

  function formatPrice(price) {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);
  }

  return (
    <Div>
      <TitleText>주문 내역</TitleText>
      <WhiteBackBox>
        <NameText>한동 공략 1조</NameText>
        <FlexDiv bottom={8.8}>
          <MenuImg src={require("../../Asset/SamSoSq.png")} />
          <FlexDiv col="column" ali="flex-start">
            <Menuname>삼겹살 + 소세지</Menuname>
            <FlexDiv justifyContent="space-between">
              <MenuNum>수량 : {orders[0]}</MenuNum>
              <Price>{formatPrice(orders[0] * 5300)} 원</Price>
            </FlexDiv>
          </FlexDiv>
        </FlexDiv>
        <FlexDiv>
          <MenuImg src={require("../../Asset/SamBeeSq.png")} />
          <FlexDiv col="column" ali="flex-start">
            <Menuname>삼겹살 + 비빔면</Menuname>
            <FlexDiv justifyContent="space-between">
              <MenuNum>수량 : {orders[1]}</MenuNum>
              <Price>{formatPrice(orders[1] * 5300)} 원</Price>
            </FlexDiv>
          </FlexDiv>
        </FlexDiv>
      </WhiteBackBox>
      <PriceCheck per={80} bottom={7}>
        결제 내역
      </PriceCheck>
      <FlexDiv justifyContent="space-between" per={80} bottom={5}>
        <PriceCheck weight={500} align="center">
          상품금액
        </PriceCheck>
        <PriceCheck size={18} align="center">
          {formatPrice(price)}원
        </PriceCheck>
      </FlexDiv>
      <FlexDiv justifyContent="space-between" per={80}>
        <PriceCheck weight={500} align="center">
          할인금액
        </PriceCheck>
        <PriceCheck size={18} align="center">
          {formatPrice(sale)}원
        </PriceCheck>
      </FlexDiv>
      <Hr />
      <FlexDiv justifyContent="space-between" per={80} bottom={6}>
        <PriceCheck weight={500} align="center">
          총 결제금액
        </PriceCheck>
        <PriceCheck weight={700} align="center" color="#F04923">
          {formatPrice(price - sale)}원
        </PriceCheck>
      </FlexDiv>
      <Button onClick={handleOnSubmit}>주문하기</Button>
    </Div>
  );
}

export default MenuCheck;
