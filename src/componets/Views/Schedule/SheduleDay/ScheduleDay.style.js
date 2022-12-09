import styled from "styled-components";

export const ScheduleWrapper = styled.div`
  border-radius: 30px;
  width: 100%;
  max-width: 1150px;
  margin: 0 auto;
  position: relative;
  min-height: 80vh;

  @media screen and (max-width: 400px) {
    border: none
  }
`

export const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  border-radius: 30px;
`

export const Lessons = styled.div`
  margin-top: 30px;
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`