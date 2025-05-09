import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { dbService } from "../../../fbase";

const DDiv = styled.div`
  background: #fff;
  margin: 0 auto;
  height: 100%;
  width: 100%;
`;

const TitleDiv = styled.div`
  display: flex;
  margin-top: 25px;
  margin-left: 80px;
  align-items: center;
`;

const HomeTitle = styled.div`
  color: var(--black-background, #1a1a1a);
  font-family: "Pretendard";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
`;

const Title = styled.div`
  color: var(--black-background, #1a1a1a);
  font-family: "Pretendard";
  font-size: 52px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
`;

const BodyDiv = styled.div`
  display: flex;
  margin-top: 83px;
  margin-left: 80px;
  height: 744px;
`;

const RightDiv = styled.div`
  width: 100%;
  height: 744px;
  margin-right: 40px;
`;

const ScheduleDiv = styled.div`
  height: 656px;
  margin-top: 30px;
`;

const ScheduleItem = styled.div`
  width: 98;
  height: 115px;
  padding: 1vw;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  margin-bottom: 22px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

const ScheduleFirstDiv = styled.div`
  margin-top: 16px;
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 6px;
  padding: 10px;
`;

const FlexDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: ${(props) => props.top || 0}px;
`;

const NumText = styled.div`
  color: var(--Black-Background, #1a1a1a);
  /* Admin/A4-M-16 */
  font-size: 30px;
  font-style: normal;
  font-weight: 300;
  line-height: 32px;

  span {
    font-weight: 700;
  }
`;

const Button = styled.button`
  width: 120px;
  padding: 1vw; // 반응형 패딩
  background-color: ${(props) =>
    props.status === 0 ? "#00a86b" : props.status === 1 ? "red" : "gray"};
  color: white;
  border: none;
  color: #fff;

  font-family: "Noto Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  cursor: pointer;
  border-radius: 5.3333vw;
  margin-top: 20px;

  &:hover {
    background-color: #00a86b;
  }
`;

const GirsRoomStory = () => {
  const [schedules, setSchedule] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(dbService, "order"), (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setSchedule(newData);
    }, (error) => {
      console.error("Error fetching schedules:", error);
    });

    return () => unsubscribe(); // Cleanup the subscription on unmount
  }, []);

  const handleStatusChange = async (schedule) => {
    const newStatus = schedule.status === 0 ? 1 : 2;
    const message =
      schedule.status === 0 ? "조리시키겠습니까?" : "주문 처리 하시겠습니까?";

    if (window.confirm(message)) {
      try {
        const docRef = doc(dbService, "order", schedule.id);
        await updateDoc(docRef, { status: newStatus });
        alert("상태가 업데이트되었습니다.");
      } catch (error) {
        console.error("Error updating document: ", error);
        alert("상태 업데이트에 실패했습니다.");
      }
    }
  };

  return (
    <DDiv>
      <TitleDiv>
        <Title>주방</Title>
      </TitleDiv>
      <BodyDiv>
        <RightDiv>
          <HomeTitle>주문 업데이트</HomeTitle>
          <ScheduleDiv>
            {schedules
              .filter((schedule) => schedule.status == 1)
              .map((schedule, index) => (
                <ScheduleItem key={schedule.id}>
                  <FlexDiv>
                    <ScheduleFirstDiv>
                      <FlexDiv top={-5}>
                        <HomeTitle>주문 순서 : {index+1}</HomeTitle>
                        <div>
                        <NumText>
                            삼 + 소 수량 : <span>{schedule.menuCount[0]}</span>
                          </NumText>
                          <NumText>
                            삼 + 비 수량 :  <span>{schedule.menuCount[1]}</span>
                          </NumText>
                        </div>
                      </FlexDiv>
                    </ScheduleFirstDiv>
                    <Button
                      status={schedule.status}
                      onClick={() => handleStatusChange(schedule)}
                    >
                      {schedule.status === 0
                        ? "접수중"
                        : schedule.status === 1
                        ? "조리중"
                        : "완료"}
                    </Button>
                  </FlexDiv>
                </ScheduleItem>
              ))}
          </ScheduleDiv>
        </RightDiv>
      </BodyDiv>
    </DDiv>
  );
};

export default GirsRoomStory;
