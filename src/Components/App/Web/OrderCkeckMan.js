import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  collection,
  doc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
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
  const location = useLocation();
  const [schedules, setSchedule] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const q = query(collection(dbService, "order"), orderBy("time", "desc")); // 시간 내림차순 정렬
    // 'time' 필드에 따라 정렬
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          time: doc.data().time
            ? new Date(doc.data().time.toDate()).toLocaleString()
            : null,
        }));
        setSchedule(newData);
        setTotalCount(snapshot.docs.length);
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
      schedule.status === 0 ? "접수시키겠습니까?" : "완료 처리 하시겠습니까?";

    if (window.confirm(message)) {
      try {
        const docRef = doc(dbService, "order", schedule.id);
        await updateDoc(docRef, { status: newStatus });
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
    <DDiv key={location.pathname}>
      <TitleDiv>
        <Title>주문 체크</Title>
      </TitleDiv>
      <BodyDiv>
        <RightDiv>
          <HomeTitle>일정 업데이트</HomeTitle>
          <div style={{ marginTop: "10px", fontSize: "16px", color: "#555" }}>
            총 주문 수: {totalCount}건
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{ marginTop: "20px", marginBottom: "10px" }}
          >
            주문 히스토리 보기
          </button>
          <ScheduleDiv>
            {schedules
              .filter((schedule) => schedule.status !== 2)
              .map((schedule, index) => (
                <ScheduleItemComponent
                  key={schedule.id}
                  schedule={schedule}
                  index={index}
                  handleStatusChange={handleStatusChange}
                />
              ))}
          </ScheduleDiv>
          {isModalOpen && (
            <ModalOverlay onClick={() => setIsModalOpen(false)}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <h3>완료된 주문</h3>
                <CloseButton onClick={() => setIsModalOpen(false)}>
                  닫기
                </CloseButton>
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                  {schedules
                    .filter((s) => s.status === 2)
                    .map((s) => (
                      <div
                        key={s.id}
                        style={{
                          marginBottom: "10px",
                          borderBottom: "1px solid #eee",
                          paddingBottom: "8px",
                        }}
                      >
                        <div>
                          <strong>주문시간:</strong> {s.time}
                        </div>
                        <div>
                          <strong>수량:</strong>{" "}
                          {Array.isArray(s.menuCount)
                            ? s.menuCount.join(", ")
                            : s.menuCount}
                        </div>
                        <div>
                          <strong>전화번호</strong>{" "}
                          {s.phoneNumber ? s.phoneNumber : "전화번호 없음"}
                        </div>
                      </div>
                    ))}
                  {schedules.filter((s) => s.status === 2).length === 0 && (
                    <div
                      style={{
                        color: "#888",
                        textAlign: "center",
                        marginTop: "20px",
                      }}
                    >
                      완료된 주문이 없습니다.
                    </div>
                  )}
                </div>
              </ModalContent>
            </ModalOverlay>
          )}
        </RightDiv>
      </BodyDiv>
    </DDiv>
  );
};

export default OrderCkeckMan;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  border: none;
  background: none;
  font-size: 16px;
  cursor: pointer;
`;
