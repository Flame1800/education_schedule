import React from 'react';
import styled, {css} from "styled-components";

const TalksPromoInfo = ({pair, rounded}) => {
    return (
            <InfoBlock rounded={rounded}>
                Разговоры о важном. Начало в {pair === 4 ? "13:10" : "08:30"}
            </InfoBlock>
    );
};

const InfoBlock = styled.div`
  height: 21px;
  background: #ffda83;
  left: 20px;
  font-size: 12px;
  padding: 0 5px; 
  display: flex;
  align-items: center;
  z-index: 99;
  max-width: 675px;
  width: 100%;
  ${({rounded}) => rounded && css`
    padding: 10px;
    border-radius: 10px;
    font-weight: 600;
    height: auto;
    font-size: 14px;
  `}
`

export default TalksPromoInfo;