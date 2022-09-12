import React from 'react';
import './sheduleWeek.scss';
import filterLessons from "../../utils/filterLessons";
import {observer} from "mobx-react-lite";
import datesStore from "../../store/datesStore";
import viewModeStore from "../../store/viewModeStore";
import sortLessons from "../../utils/sortLessons";
import scheduleStore from "../../store/scheduleStore";
import WeekLesson from "../Lesson/WeekLesson/WeekLesson";


function ScheduleWeek() {
    const {setDay, datesWeek} = datesStore
    const {setView} = viewModeStore
    const {currLessons} = scheduleStore

    const generateLessons = (dayLessons) => {
        const fLessons = filterLessons(dayLessons);
        return fLessons.map((lesson) => <WeekLesson key={lesson._id} lesson={lesson}/>);
    }


    const changeViewHandle = (date) => {
        setDay(date.toISODate())
        setView('day')
    }
    const emptyLessons = <div className="no-lessons"> Пар нет </div>

    return (
        <div className="shedule-week p-0">
            {datesWeek.map(day => {
                const dayLessons = sortLessons(currLessons.filter(lesson => lesson.date === day.toISODate()));
                const dayLessonsComponent = dayLessons.length === 0 ? emptyLessons : generateLessons(dayLessons)

                const dayWeek = <div className="day-week">{day.toFormat('EEEE')}</div>
                const dayMonth = <div className="day">{day.toFormat("d LLL")}</div>
                const changeViewButton = (
                    <div className="cont-btn-more" onClick={() => changeViewHandle(day)}>
                        <div className="btn-more"/>
                    </div>
                )

                return (
                    <div className="container-day" key={day.day}>
                        <div className="row-items">
                            <div className="head">
                                {dayWeek}
                                <div className="min-cont">
                                    {dayMonth}
                                    {changeViewButton}
                                </div>
                            </div>
                            <div className="lesson-cont">
                                {dayLessonsComponent}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );

}

export default observer(ScheduleWeek);