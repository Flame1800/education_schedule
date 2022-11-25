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
`

export const Item = styled.div`
  width: 200px;
  padding: 3px 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${props => props.active && css`
    color: #4b4b4b;
    font-weight: 500;
    background: #EABC5D;
    border-radius: 30px;
    padding: 10px;
    height: 99%;
  `}
`
