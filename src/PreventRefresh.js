import { useEffect } from "react";
import {  useLocation } from "react-router-dom";

function PreventRefresh() {
  const location = useLocation();  // 현재 경로를 얻기 위해 useLocation 사용

  useEffect(() => {
    // 새로고침 허용 페이지 목록
    const refreshAllowedPaths = ['/order-CheckMan', '/order-GirsRoomStory'];

    // 현재 페이지가 새로고침을 허용하는 페이지인지 확인
    if (!refreshAllowedPaths.includes(location.pathname)) {
      const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = ""; // 대부분의 브라우저에서 사용자에게 경고를 표시하는데 필요
      };

      window.addEventListener("beforeunload", handleBeforeUnload);
      // navigate("/");

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, []); // location.pathname 의존성 추가

  return null; // UI가 없는 컴포넌트
}

export default PreventRefresh;

