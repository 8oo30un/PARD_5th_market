import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ParkImg from "../../../Asset/ParkImg.png";
import BongImg from "../../../Asset/BongImg.png";
import LeeImg from "../../../Asset/LeeImg.png";
import Lim from "../../../Asset/Lim.png";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 75vw;
  height: auto;
  margin-top: 8vw;
`;

const LastTile = styled.img`
  width: 20.8vw;
  height: auto;
  margin-top: 15vw;
`;

const NameText = styled.div`
  color: #000;

  text-align: center;
  font-family: "Noto Sans";
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  margin-top: 5.0667vw;
`;

const Explain = styled.div`
  color: var(--Color-2, #363636);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
  margin-top: 2.6667vw;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 62px;
  background-color: #00a86b;
  color: #fff;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 4.2667vw;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  border: none;
  margin-top: 12.2667vw;
`;

function LastPage() {
  const [img, SetImg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    SetImg(localStorage.getItem("img"));
  }, []);

  const getImagePath = (imageName) => {
    // 모든 이미지를 여기에서 관리
    const images = {
      ParkImg: ParkImg,
      BongImg: BongImg,
      LeeImg: LeeImg,
      Lim: Lim,
    };
    return images[imageName];
  };

  const getName = (imageName) => {
    // 모든 이미지를 여기에서 관리
    const images = {
      ParkImg: "박정규",
      BongImg: "봉민석",
      LeeImg: "이태양",
      Lim: "임시우",
    };
    return images[imageName];
  };

  return (
    <Div>
      <LastTile src={require(`../../../Asset/lastPageText.png`)} alt="박사장" />
      <Image src={getImagePath(img)} alt="박사장" />
      <NameText>{getName(img)}</NameText>
      <Explain>
        이 화면을 해당 분에게 보여주시면,
        <br />
        작은 선물을 드립니다!
      </Explain>
      <SubmitButton onClick={() => navigate("/")}>
        홈 화면으로 돌아가기
      </SubmitButton>
    </Div>
  );
}

export default LastPage;
