import styled from "styled-components";

export const ScheduleWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  user-select: none;
  padding: 0;
  width: 100%;
`


export const DayLessonsWrapper = styled.div`
  max-width: 241px;
  min-width: 245px;
  width: 241px;
  margin-right: 15px;
  border-radius: 10px 10px 0 0;
  padding-bottom: 10px;
  margin-top: 15px;
`

export const Main = styled.div`
  margin: 0 auto;
`

export const Header = styled.div`
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
  background: #414050;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

export const Meta = styled.div`
  margin-right: 10px;
  margin-left: 10px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 55%;
  align-items: end;
`

export const DayLesson = styled.div`
  text-transform: capitalize;
  font-size: 13px;
  margin-left: 15px;
  font-weight: 600;
  color: #fff;
`

export const DayMonth = styled.div`
  width: 80px;
  height: 22px;
  font-size: 14px;
  top: 45px;
  color: #fff;
  border-radius: 5px;
  transition: 0.2s;
  margin-bottom: 1px;
`

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 10px;
  margin-right: 10px;
  margin-left: 10px;
  background: #FAC145;
  cursor: pointer;

  img {
    height: 16px;
    width: 16px;
    margin-right: 5px;
    margin-left: 5px;
  }
`

export const Lessons = styled.div`
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;
  border: 1px solid #c2c2c2;
  height: 541px;
`