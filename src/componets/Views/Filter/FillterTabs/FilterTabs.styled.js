import styled, {css} from "styled-components";

export const FilterItems = styled.div`
  display: flex;
  margin-left: 20px;
  margin-top: 40px;
  color: #777777;
  font-size: 20px;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 550px) {
    position: relative;
    flex-direction: column;
    margin: 0;
    height: 80vh;
  }
`

export const Column = styled.div`
  margin-right: 50px;
`

export const OverflowColumn = styled.div`
  height: 60vh;
  width: 50%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  border-radius: 10px;
  background: #f5f5f5;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #e7e7e7;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
  }

  @media screen and (max-width: 550px) {
    padding-top: 20px;
    position: absolute;
    background: #f5f5f5;
    top: 0;
    z-index: 10;
    width: 100%;
    font-size: 16px;
  }

`


export const FilterParamWrapper = styled.div`
  margin-bottom: 2px;
  cursor: pointer;
  transition: 0.1s;
  padding: 10px;
  border-radius: 5px;

  &:hover {
    background: #fff4d4;
  }

  ${props => props.active && css`
    background: #fdde9b;
    color: #343434;

    &:hover {
      background: #fdde9b;
    }
  `}
`

export const BackIcon = styled.img`
  display: none;

  @media screen and (max-width: 550px) {
    width: 21px;
    height: 21px;
    margin-bottom: 20px;
    margin-top: 10px;
    margin-left: 5px;
    display: block !important;
  }
`