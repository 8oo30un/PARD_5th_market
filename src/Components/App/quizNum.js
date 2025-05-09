import React from "react";
import styled, { css, ThemeProvider } from "styled-components";
import { theme } from "../../Style/theme";

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 92%;
  margin-bottom: 17.3333vw;
`;

const Circle = styled.div`
  width: 5.3333vw;
  height: 5.3333vw;
  border-radius: 50%;
  background-color: #c4e8db;
  ${(props) =>
    props.active &&
    css`
      background-color: #00a86b;
    `};
`;

const Line = styled.div`
  flex-grow: 1;
  height: 1px;
  border-top: 2px dashed #c4e8db;
  margin-left: 5px;
  margin-right: 5px;

  ${(props) =>
    props.active &&
    css`
      border-color: #00a86b;
    `}
`;

const ProgressComponent = ({ step }) => {
  return (
    <ThemeProvider theme={theme}>
      <ProgressBar>
        <Circle active={step > -1} />
        <Line active={step > 0} />
        <Circle active={step > 0} />
        <Line active={step > 1} />
        <Circle active={step > 1} />
        <Line active={step > 2} />
        <Circle active={step > 3} />
        <Line active={step > 3} />
        <Circle active={step > 4} />
      </ProgressBar>
    </ThemeProvider>
  );
};

export default ProgressComponent;
