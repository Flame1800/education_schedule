import styled from "styled-components";

export const LessonWrap = styled.div`
  height: 90px;
  overflow: hidden;
  border-bottom: 1px solid #cbcbcb;
  background: rgba(234, 188, 93, 0.0784313725);
  position: relative;
`

export const UnactiveLesson = styled(LessonWrap)`
  background: none;
`

export const LessonHead = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 16px;
`

export const Time = styled.div`
  font-size: 11px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  padding: 0 10px;
  background: rgb(255, 242, 211);
  color: #1e1e1e;
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
  font-size: 12px !important;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 200px;
`

export const ShortLessonName = styled(LessonName)`
  max-width: 103px;
`

export const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`

export const MinCont = styled(Meta)`
  flex-direction: column;
  align-items: start;
  width: 50%;
`

export const MetaText = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  color: #7a7a7a;
`

export const CabNum = styled.div`
  display: flex;
  margin-right: 8px;
  font-size: 12px;
  color: #494949;
  border-radius: 10px;
  padding-top: 10px;
`
