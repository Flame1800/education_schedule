import React from 'react';
import {ScheduleWrapper} from "../Schedule/SheduleDay/ScheduleDay.style";
import NoLessonsTitle from "../../Common/NoLessonsTitle";
import {Link} from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
    return (
        <ScheduleWrapper>
            <NoLessonsTitle>Ничего не найдено</NoLessonsTitle>
            <Btn>
                <Link to='/timetable'>Вернуться к расписанию</Link>
            </Btn>
        </ScheduleWrapper>
    );
};

const Btn = styled.div`
  margin-top: 30px;
  width: 100%;
  font-size: 20px;
  font-weight: 500;
  display: flex;
  justify-content: center;

  a {
    border-radius: 10px;
    border: #ababab 1px solid;
    padding: 10px;
  }
`

export default NotFound;