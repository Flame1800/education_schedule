import React from "react";
import "./sheduleDay.scss";
import {observer} from "mobx-react-lite";
import NavWeek from "../../../NawWeek/NawWeek";
import datesStore from "../../../../store/datesStore";
import DayLesson from "../../../Lesson/DayLesson/DayLesson";
import {Lessons, Main, ScheduleWrapper} from "./ScheduleDay.style";
import NoLessonsTitle from "../../../Common/NoLessonsTitle";
import fillEmptyLessons from "../../../../lib/fillEmptyLessons";


function ScheduleDay({lessons}) {
    const {currDay} = datesStore

    const filterLessonsByDay = (lessons) => lessons.filter((lesson) => lesson.date === currDay)
    const dayLessons = filterLessonsByDay(lessons)


    return (
        <ScheduleWrapper>
            {lessons.length !== 0 && <NavWeek/>}
            <Main>
                <Lessons>
                    {dayLessons.length === 0
                        ? <NoLessonsTitle>Нет пар</NoLessonsTitle>
                        : fillEmptyLessons(dayLessons).map((lesson) => {
                            return <DayLesson key={lesson._id} lesson={lesson}/>;
                        })}
                </Lessons>
            </Main>
        </ScheduleWrapper>
    );
}

export default observer(ScheduleDay);
