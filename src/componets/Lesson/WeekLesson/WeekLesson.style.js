import styled from "styled-components";

export const LessonWrap = styled.div`
  height: 90px;
  padding: 4px 0;
  overflow: hidden;
  border-bottom: 1px solid #cbcbcb;
  background: rgba(234, 188, 93, 0.0784313725);
`

export const UnactiveLesson = styled(LessonWrap)`
  background: none;
`

export const Num = styled.div`
  font-size: 12px;
  margin-bottom: -20px;
  margin-top: -4px;
  border-right: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  border-radius: 3px;
`

export const Content = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
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
