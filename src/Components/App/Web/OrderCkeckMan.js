import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, doc, updateDoc, onSnapshot, deleteDoc, query, orderBy, } from "firebase/firestore";
import { dbService } from "../../../fbase";
import ScheduleItemComponent from "./ScheduleItemComponent";

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



const Title = styled.div`
  color: var(--black-background, #1a1a1a);
  font-family: "Pretendard";
  font-size: 52px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
`;

const OrderCkeckMan = () => {
  const [schedules, setSchedule] = useState([]);

  useEffect(() => {
    const q = query(collection(dbService, "order"), orderBy("time"));  // 시간 내림차순 정렬
 // 'time' 필드에 따라 정렬
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          time: doc.data().time ? new Date(doc.data().time.toDate()).toLocaleString() :null
        }));
        setSchedule(newData);
      },
      (error) => {
        console.error("Error fetching schedules:", error);
      }
    );
  
    // 구독 취소 함수를 반환하여 컴포넌트 언마운트 시 실시간 업데이트 중지
    return () => unsubscribe();
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
        const updatedSchedules = schedules.map((s) =>
          s.id === schedule.id ? { ...s, status: newStatus } : s
        );
        setSchedule(updatedSchedules);
      } catch (error) {
        console.error("Error updating document: ", error);
        alert("상태 업데이트에 실패했습니다.");
      }
    }
  };


  return (
    <DDiv>
      <TitleDiv>
        <Title>주문 체크</Title>
      </TitleDiv>
      <BodyDiv>
        <RightDiv>
          <HomeTitle>일정 업데이트</HomeTitle>
          <ScheduleDiv>
             {schedules.filter(schedule => schedule.status !== 2).map((schedule, index) => (
        <ScheduleItemComponent key={schedule.id} schedule={schedule} index={index} handleStatusChange={handleStatusChange} />
      ))}
          </ScheduleDiv>
        </RightDiv>
      </BodyDiv>
    </DDiv>
  );
};

export default OrderCkeckMan;
