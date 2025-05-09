import React from "react";
import styled from "styled-components";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { dbService } from "../../../fbase";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
`;

const PersonCard = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const Image = styled.img`
  width: 40vw;
`;

const Title = styled.img`
  width: 90%;
  margin-top: 20vw;
  margin-bottom: 20px;
`;

const Name = styled.img`
  width: 20.8vw;
  height: auto;
`;

const Div = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
`;


function VoteScreen() {

    const navigate = useNavigate();
    const VoteSubmit = async (img) => {
        localStorage.setItem("img", img);
        console.log("버튼 클릭: ", img);
      
        // Firestore에서 해당 문서 참조 생성
        const docRef = doc(dbService, "hi", img);
      
        try {
          // 문서 읽기 시도
          const docSnap = await getDoc(docRef);
          navigate('/LastPage')
      
          if (docSnap.exists()) {
            // 문서가 존재하면 count 필드 업데이트
            await updateDoc(docRef, {
              count: docSnap.data().count + 1,
            });
            console.log("Document updated with ID: ", docSnap.id);
          } else {
            // 문서가 존재하지 않으면 새 문서 생성
            await setDoc(docRef, { count: 1 });
            console.log("New document created with ID: ", docRef.id);
          }
        } catch (error) {
          console.error("Error updating document: ", error);
        }
      };

  return (
    <Container>
      <Title src={require("../../../Asset/VoteTitle.png")} alt="투표해주세요" />
      <PersonCard>
        <Div onClick={() => VoteSubmit("ParkImg")}>
          <Image src={require("../../../Asset/ParkImg.png")} alt="박사장" />
          <Name src={require("../../../Asset/ParkText.png")} />
        </Div>
        <Div onClick={() => VoteSubmit("BongImg")}>
          {" "}
          <Image src={require("../../../Asset/BongImg.png")} alt="봉아랍" />
          <Name src={require("../../../Asset/BongText.png")} />
        </Div>
      </PersonCard>
      <PersonCard>
        <Div onClick={() => VoteSubmit("LeeImg")}>
          <Image src={require("../../../Asset/LeeImg.png")} alt="이유도" />
          <Name src={require("../../../Asset/LeeText.png")} />
        </Div>
        <Div onClick={() => VoteSubmit("Lim")}>
          <Image src={require("../../../Asset/Lim.png")} alt="임폴" />
          <Name src={require("../../../Asset/LeemText.png")} />
        </Div>
      </PersonCard>
    </Container>
  );
}

export default VoteScreen;
