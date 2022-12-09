import styled, {css} from "styled-components";

export const NawWeekWrapper = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: space-around;
  height: 60px;
  user-select: none;
  z-index: 20;
  top: 0;
  border: 1px solid #ADADAD;
  border-radius: 20px;
`

export const Num = styled.div`
  color: #6F6F6F;
  font-size: 18px;

`

export const Day = styled.div`
  width: 50px;
  height: 22px;
  font-size: 14px;
  top: 45px;
  color: #000;
  margin-bottom: -20px;
  margin-top: 5px;
  font-weight: normal;
  background: #C4C4C4;
  border-radius: 5px;
  transition: 0.2s;
`


export const WeekDayItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: #6F6F6F;
  font-size: 18px;
  cursor: pointer;
  transition: 0.2s;

  ${props => props.active && css`
    background: #414050 !important;
    color: #fff !important;

    .day {
      background: #FAC145 !important;
    }

    ${Num} {
      color: #fff;
    }

    ${Day} {
      background: #FAC145 !important;
    }
  `}
  &:hover {
    ${Num} {
      color: #ffffff;
    }

    ${Day} {
      background: #FAC145 !important;
    }

    background: #585867;
    color: #A4B3CA;
  }

  &:first-child {
    border-radius: 15px 0 0 15px;
  }

  &:last-child {
    border-radius: 0 15px 15px 0;
    width: 101%;
  }
`
