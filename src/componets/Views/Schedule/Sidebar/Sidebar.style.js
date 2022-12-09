import styled from "styled-components";


export const SidebarWrapper = styled.div`
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1120px;
  user-select: none;
  display: flex;
`

export const Main = styled.main`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`

export const GroupTitle = styled.span`
  width: 200px;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #525252;
`


export const FilterBtn = styled.div`
  border: 1px solid #9B9B9B;
  border-radius: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  transition: .2s;
  width: 140px;

  img {
    opacity: 0.7;
    height: 22px;
    width: 22px;
    background-size: contain;
    margin-right: 13px;
  }
`


export const BtnTitle = styled.span`
  font-size: 18px;
  color: #4b4b4b;
`