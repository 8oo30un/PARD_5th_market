import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { deleteDoc, doc } from "firebase/firestore";
import { dbService } from "../../../fbase";
import styled from "styled-components";

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
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  margin-right: 20px;
`;

const Button = styled.button`
  width: 140px;
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
const HomeTitle = styled.div`
  color: var(--black-background, #1a1a1a);
  font-family: "Pretendard";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
`;
const ScheduleItem = styled.div`
  width: 100%;
  height: 115px;
  padding: 1vw;
  background-color: ${(props) => (props.isSwiping ? "#ffcccc" : "#ffffff")};
  border: 1px solid #e0e0e0;
  margin-bottom: 22px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  transition: background-color 300ms ease;
`;

const ScheduleItemComponent = ({ schedule, index, handleStatusChange }) => {
  const [isSwiping, setIsSwiping] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      handleDelete(schedule.id);
      setIsSwiping(false); // Ensure state is reset after swipe
    },
    onSwiping: (eventData) => {
      // Start visual feedback when user is swiping
      if (eventData.dir === "Left" && eventData.absX > 50) {
        setIsSwiping(true);
      }
    },
    onSwiped: () => {
      // Reset the visual feedback when swipe is complete
      setIsSwiping(false);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(dbService, "order", id));
      console.log("Order deleted successfully.");
    } catch (error) {
      console.error("Error deleting the order: ", error);
    }
  };

  return (
    <ScheduleItem {...handlers} isSwiping={isSwiping}>
      <FlexDiv>
        <FlexDiv>
          <div>
            <HomeTitle>주문 순서: {index + 1}</HomeTitle>
            <FlexDiv>
              <div>
                <NumText>삼 + 소 수량: {schedule.menuCount[0]}</NumText>
                <NumText>삼 + 비 수량: {schedule.menuCount[1]}</NumText>
              </div>
            </FlexDiv>
          </div>
         <div>
         <HomeTitle>고객 전화번호</HomeTitle>
          <NumText>{schedule.phoneNumber}</NumText>
          <NumText>{schedule.time}</NumText>
         </div>
        </FlexDiv>
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
  );
};

export default ScheduleItemComponent;
