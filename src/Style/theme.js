import { createGlobalStyle } from "styled-components";

// GlobalStyle을 생성 => 폰트 적용
export const GlobalStyle = createGlobalStyle`

margin: 0;


  body{
    font-family: 'Noto Sans', sans-serif;
   }

`;

export const theme = {
  colors: {
    primary: "#3498db",
    secondary: "#2ecc71",
    accent: "#e74c3c",
    background: "#ecf0f1",
    text: "#2c3e50",
  },
  Web_fontSizes: {
    Header1: "32px",
    Header2: "18px",
    Header3: "24px",
    Header4: "20px",
    Body1: "16px",
    Body2: "14px",
    Body3: "14px",
    Body4: "16px",
    Body5: "14px",
    Body6: "16px",
    Caption1: "12px",
    Caption2: "12px",
    Caption3: "12px",
    Caption4: "16px",
  },
  fontWeights: {
    Header1: "700",
    Header2: "600",
    Header3: "400",
    Header4: "700",
    Body1: "600",
    Body2: "500",
    Body3: "600",
    Body4: "400",
    Body5: "500",
    Body6: "600",
    Caption1: "500",
    Caption2: "600",
    Caption3: "700",
    Caption4: "700",
  },
  LineHeight: {
    Header1: "38px",
    Header2: "22px",
    Header3: "28px",
    Header4: "24px",
    Body1: "20px",
    Body2: "18px",
    Body3: "18px",
    Body4: "20px",
    Body5: "20px",
    Body6: "24px",
    Caption1: "16px",
    Caption2: "16px",
    Caption3: "14px",
    Caption4: "20px",
  },
};
