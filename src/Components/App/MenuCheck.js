import { PacmanLoader } from "react-spinners";
import styled from "styled-components";
import { useOrder } from "../../contexts/OrderContext";
import React, { useState, useEffect, useContext } from "react";
import { ScoreContext } from "../../contexts/ScoreContext";
import { useNavigate } from "react-router-dom";
// Firestore imports removed
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useMenu } from "../../contexts/MenuContext";

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
  const [isImageLoading, setIsImageLoading] = useState(true);
  const navigate = useNavigate();
  const { menuData } = useMenu();

  useEffect(() => {
    let extra = 0;
    if (score === 5) {
      extra = 700;
    } else if (score >= 3) {
      extra = 500;
    }

    let total = 0;
    let discount = 0;
    for (let i = 0; i < menuData.length; i++) {
      total += orders[i] * menuData[i].price;
      discount += orders[i] * extra;
    }

    SetPrice(total);
    SetSale(discount);
  }, []);

  const handleOnSubmit = () => {
    // Navigate to /order-submit and pass orders, price, sale as state
    navigate("/order-submit", { state: { orders, price, sale } });
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
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(price);
  }

  return (
    <Div>
      <TitleText>주문 내역</TitleText>
      <WhiteBackBox>
        <NameText>주문서</NameText>
        {menuData.map((item, idx) => (
          <FlexDiv bottom={8.8} key={item.id}>
            <MenuImg
              src={item.image}
              onLoad={() => setIsImageLoading(false)}
              style={{ display: isImageLoading ? "none" : "block" }}
            />
            {isImageLoading && (
              <Skeleton
                width={(20 * window.innerWidth) / 100}
                height={(20 * window.innerWidth) / 100}
              />
            )}
            <FlexDiv col="column" ali="flex-start">
              <Menuname>{item.name}</Menuname>
              <FlexDiv justifyContent="space-between">
                <MenuNum>수량 : {orders[idx]}</MenuNum>
                <Price>{formatPrice(orders[idx] * item.price)} 원</Price>
              </FlexDiv>
            </FlexDiv>
          </FlexDiv>
        ))}
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
      <FlexDiv justifyContent="space-between" per={80} bottom={-6}></FlexDiv>
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
