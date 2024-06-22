import React from 'react';
import styled, { css } from "styled-components";

const TalksPromoInfo = ({ pair, rounded }) => {

  return (
    <InfoBlock rounded={rounded}>
      Разговоры о важном ({pair === 4 ? 2 : 1} смена)
    </InfoBlock>
  );
};

const InfoBlock = styled.div`
  font-family: "Inter", sans-serif;
  height: 21px;
  background: #FFE178;
  left: 20px;
  font-size: 12px;
  padding: 0 5px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  z-index: 99;
  max-width: 675px;
  width: 100%;
  border-radius: 5px;
  font-weight: 600;
  ${({ rounded }) => rounded && css`
    padding: 10px;
    border-radius: 10px;
    font-weight: 600;
    height: auto;
    font-size: 14px;
  `}
`

export default TalksPromoInfo;