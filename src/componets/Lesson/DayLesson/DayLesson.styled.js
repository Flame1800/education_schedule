import styled from "styled-components";


export const LessonCardWrapper = styled.div`
  display: flex;
  transition: 0.4s;
  max-width: 750px;
  width: 100%;
  margin-bottom: 15px;

`

export const NumLessons = styled.span`
  font-size: 48px;
  font-weight: bold;
  width: 40px;
  color: #bdbdbd;
  cursor: pointer;
`


export const LessonContent = styled.div`
  background: #f5f5f5;
  min-height: 120px;
  width: 90%;
  margin-top: 20px;
  border-radius: 15px;
  padding-left: 20px;
  padding-right: 20px;
  transition: 0.3s;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Time = styled.div`
  text-align: center;
  height: 20px;
  font-size: 13px;
  font-weight: bold;
  line-height: 0;
  border-radius: 12px;
  margin-bottom: -10px;
  background: #fff;
  color: #4b4b4b;
  border: 1px solid #d3d3d3;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
`

export const EmptyLessonStyle = styled(LessonContent)`
  display: flex;
  justify-content: center;
  align-items: center;
  
  .active {
    color: #2a2a2a;
  }

  span {
    font-weight: 600;
    font-size: 20px;
    color: #a9a9a9;
  }
`

export const LessonCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
  margin-bottom: 10px;
  width: 100%;
`

export const InfoTitle = styled.div`
  color: #424242;
  font-size: 16px;
  margin-bottom: 5px;
  transition: 0.3s;
`

export const SubTitle = styled.div`
  color: #626262;
  font-size: 13px;
  font-weight: 600;
`

export const Sign = styled.div`
  width: 17px;
  height: 17px;
  margin-bottom: -10px;
  border-radius: 50%;
  background: #fac145;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  color: #000;
  font-weight: 600;
  position: relative;
  z-index: 2;
`

export const Cab = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background: #ffe3a7;
  color: #444444;
  border-radius: 10px;
  font-weight: 600;
  min-width: 45px;
  height: 26px;
  padding: 10px;
  margin-left: 7px;
  transition: 0.3s;
  margin-bottom: 10px;
`
