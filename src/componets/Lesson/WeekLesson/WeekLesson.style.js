import styled from "styled-components";




export const LessonWrap = styled.div`
  position: relative;
  background-color: #f5f5f5;
  border-radius: 10px;
  margin-bottom: 10px;
  min-height: 122px;
  max-height: 122px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:first-child {
    margin-top: 0px;
  }
`


export const MinLessonWrap = styled(LessonWrap)`
  height: 83px;
`


export const UnactiveLesson = styled(LessonWrap)`
display: flex;
justify-content: center;
align-items: center;
max-height: 98px;
position: relative;
background-color: #f5f5f5;
  height: ${({ h }) => h ?? '90px'};
`



export const Time = styled.div`
font-family: "Inter", sans-serif;
font-size: 12px;
color: black;
letter-spacing: 0;
background-color: #FFE178;
padding-top: 4px;
padding-bottom: 4px;
padding-left: 8px;
padding-right: 8px;
border-radius: 32px;
font-weight: 600;
margin-bottom: 12px;
margin-left: 15px;
height: 26px;
`

export const Num = styled.div`
  height: 16px;
  font-size: 12px;
  margin-bottom: -20px;
  border-right: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  border-radius: 3px;
`

export const Content = styled.div`
  padding-top: 5px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 75%;
  padding-left: 10px;
  padding-right: 10px;
`


export const LessonName = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 15px !important;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 190px;
  font-weight: 600;
  color: black;
  margin-left: 5px;
`

export const ShortLessonName = styled(LessonName)`
  max-width: 165px;
  margin-top: 8px;
`

export const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`

export const MinCont = styled(Meta)`
  width: 100%;
  display: flex;
`

export const MetaText = styled.div`
  width: 100%;
  font-family: "Inter", sans-serif;
  display: flex;
  font-size: 13px;
  align-items: center;
  color: black;
  opacity 0.8;
  font-weight: 400;
  justify-content: space-between;
  margin-left: 7px;
`

export const CabNum = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 12px;
  color: black;
  letter-spacing: 0;
  border-radius: 32px;
  background-color: #FFE178;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 8px;
  padding-right: 8px;
  font-weight: 600;
  margin-bottom: 12px;
  margin-left: 5px;
  min-width: 48px;
  display: flex;
  justify-content: center;
`
