import styled, { css } from "styled-components";

export const NawWeekWrapper = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: space-around;
  height: 60px;
  user-select: none;
  z-index: 20;
  border: 1px solid #adadad;
  border-radius: 20px;
  margin-top: 10px;

  @media screen and (max-width: 425px) {
    border-radius: 0;
    position: fixed;
    bottom: 0;
    border: none;
    background: #fff;
    border-top: 1px solid #8a8a8a;
  }
`;

export const Num = styled.div`
  color: #6f6f6f;
  font-size: 16px;
  padding: 0 16px;
`;

export const Day = styled.div`
  width: 40px;
  height: 22px;
  font-size: 14px;
  top: 45px;
  color: #000;
  margin-bottom: -20px;
  margin-top: 5px;
  font-weight: normal;
  background: #c4c4c4;
  border-radius: 5px;
  transition: 0.2s;

  @media screen and (max-width: 425px) {
    position: absolute;
    top: -17px;
  }
`;

export const WeekDayItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: #6f6f6f;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s;

  ${(props) =>
    props.active &&
    css`
      background: #414050 !important;
      color: #fff !important;

      .day {
        background: #fac145 !important;
      }

      ${Num} {
        color: #fff;
      }

      ${Day} {
        background: #fac145 !important;
      }
    `}
  &:hover {
    ${Num} {
      color: #ffffff;
    }

    ${Day} {
      background: #fac145 !important;
    }

    background: #585867;
    color: #a4b3ca;
  }

  &:first-child {
    border-radius: 15px 0 0 15px;

    @media screen and (max-width: 425px) {
      border-radius: 0;
    }
  }

  &:last-child {
    border-radius: 0 15px 15px 0;
    width: 101%;

    @media screen and (max-width: 425px) {
      border-radius: 0;
    }
  }
`;
