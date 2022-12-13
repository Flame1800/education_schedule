import styled, {css} from "styled-components";

export const SwitchWrapper = styled.div`
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
  padding: 5px;
  color: #1e1e1e;
  border-radius: 35px;
  border: 1px solid #9B9B9B;
  min-width: 290px;
  max-width: 330px;
  font-size: 15px;
  cursor: pointer;

  ${props => props.fixed && css`
    @media screen and (max-width: 425px) {
      position: fixed;
      width: 100%;
      max-width: 100%;
      bottom: 0;
      margin: 0;
      left: 0;
      right: 0;
      padding-top: 5px;
      height: 55px;
      border-radius: 15px 15px 0 0;
      background: #fff;
      box-shadow: 0 0 10px 10px #f1f1f1;
      border: none;
      z-index: 100;
    }
  `}


`

export const Item = styled.div`
  width: 200px;
  padding: 3px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 99%;

  @media screen and (max-width: 425px) {
    height: 35px;
  }


  ${props => props.active && css`
    color: #4b4b4b;
    font-weight: 500;
    background: #EABC5D;
    border-radius: 30px;
    padding: 10px;
  `}


`
