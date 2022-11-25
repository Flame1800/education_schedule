import styled from "styled-components";

export const FilterWrapper = styled.div`
  border: 1px solid #9B9B9B;
  border-radius: 30px;
  max-width: 1150px;
  position: relative;
  min-height: 80vh;
  padding: 20px;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
`

export const BlockInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 30px;
  flex-wrap: wrap;
  position: absolute;
  font-size: 18px;
  color: rgb(102, 102, 102);
  bottom: 40px;
`

export const Date = styled.span`
  margin-right: 20px;
  font-size: 15px;
  margin-top: 7px;
`

export const ShowAllGroupsBtn = styled.div`
  padding: 5px 20px;
  border-radius: 20px;
  color: #9b9b9b;
  font-size: 15px;
  cursor: pointer;
  border: 1px solid #cbcbcb;
  margin-right: 20px;
  width: 150px;
  text-align: center;
  transition: 0.2s;

  &:hover {
    background: #8a8a8a;
    border: 1px solid #8a8a8a;
    color: white;
  }
`