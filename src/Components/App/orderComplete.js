import { useState } from "react";
import styled from "styled-components";
import checkMark from "../../Asset/CheckGreen.png";
import { useNavigate, useLocation } from "react-router-dom";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { dbService } from "../../fbase";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const CheckIcon = styled.img`
  width: 16%;
  margin-bottom: 2vw;
  margin-top: 15vw;
`;

const AcountText = styled.div`
  color: var(--Color-2, #363636);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 14px;
  font-weight: 700;
  line-height: 140%;
  margin-top: 3.7333vw;
`;

const SubmitText = styled.div`
  color: var(--Color-2, #363636);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 25px;
  font-weight: 700;
  line-height: 140%;
  margin-top: 2vw;
  margin-bottom: 3.2vw;
`;

const Button = styled.button`
  width: 26vw;
  padding: 1vw;
  background-color: #00a86b;
  color: white;
  border: none;
  font-size: 3.7333vw;
  font-weight: 500;
  cursor: pointer;
  border-radius: 2.9333vw;
  border: 1px solid #00a86b;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #00a86b;
  }
`;

const Icon = styled.img`
  width: 5.6vw;
  height: auto;
  margin-right: 1.3333vw;
`;

const ExplainText = styled.div`
  color: var(--Color-2, #363636);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 2.6667vw;
  font-weight: 400;
  line-height: 140%;
  margin-top: 6.1333vw;
`;

const StyledInput = styled.input`
  width: 80%;
  padding: 3vw 3vw;
  border-radius: 2.9333vw;
  background: #e5fcf4;
  border: none;
  margin-top: 8vw;
  color: #797979;
  font-family: "Noto Sans";
  font-size: 3.7333vw;
  font-weight: 400;
  line-height: 140%;

  &::placeholder {
    color: #797979;
  }

  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 62px;
  background-color: #00a86b;
  color: #fff;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 4.2667vw;
  font-weight: 500;
  line-height: 140%;
  border: none;
  margin-top: 12.2667vw;
`;

function OrderCompletionScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orders, price, sale } = location.state || {};

  const [isCopied, setIsCopied] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("79421209518");
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleOnUpdate = async () => {
    if (!phoneNumber || phoneNumber.trim() === "") {
      alert("전화번호를 입력해주세요.");
      return;
    }

    try {
      const orderData = {
        time: new Date(),
        menuCount: orders,
        price: price,
        phoneNumber: phoneNumber,
        status: 0,
      };

      const docRef = await addDoc(collection(dbService, "order"), orderData);
      await updateDoc(docRef, { id: docRef.id });

      localStorage.setItem("id", docRef.id);
      localStorage.setItem("phone", phoneNumber);
      localStorage.setItem("price", price - sale);

      console.log("주문 저장 성공");
      navigate("/order-finished");
      alert("주문 감사드립니다! \n맛있게, 금방 조리해드리겠습니다.");
    } catch (error) {
      console.error("주문 저장 실패:", error);
      alert("주문 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  function formatPrice(price) {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(price);
  }

  return (
    <Container>
      <CheckIcon src={checkMark} alt="Check Mark" />
      <AcountText>
        {formatPrice(localStorage.getItem("price"))}원,
        <br /> <span>79421209518 카카오뱅크 김기영</span>
      </AcountText>
      <SubmitText>입금 후 내역을 부스 운영자들에게 보여주세요.</SubmitText>
      <Button onClick={handleCopy}>
        <Icon
          src={
            !isCopied
              ? require("../../Asset/copyIcon.png")
              : require("../../Asset/copyfin_icon.png")
          }
        />
        {isCopied ? "복사완료" : "복사하기"}
      </Button>
      <StyledInput
        placeholder="휴대폰 번호"
        value={phoneNumber}
        onChange={handleChange}
      />
      <ExplainText>
        휴대폰 번호를 입력해주세요.
        <br />
        <br />
        이용해주셔서 감사합니다.
      </ExplainText>
      <SubmitButton onClick={handleOnUpdate}>주문 완료하기</SubmitButton>
    </Container>
  );
}

export default OrderCompletionScreen;
