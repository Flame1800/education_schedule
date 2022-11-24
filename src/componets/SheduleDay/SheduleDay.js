import React from "react";
import "./sheduleDay.scss";
import {observer} from "mobx-react-lite";
import scheduleStore from "../../store/scheduleStore";
import NavWeek from "../NawWeek/NawWeek";
import datesStore from "../../store/datesStore";
import DayLesson from "../Lesson/DayLesson/DayLesson";
import filterLessons from "../../utils/filterLessons";

function ScheduleDay() {
    const {currDay} = datesStore
    const [dayLessons, setDayLessons] = React.useState([])

    React.useEffect(() => {
        const newLessons = scheduleStore.currLessons.filter((lesson) => {
            return lesson.date === currDay
        })
        setDayLessons(newLessons)
    }, [currDay])

    const isEmptyLessons = scheduleStore.currLessons.length !== 0


    const lessons = (
        <div className="content">
            <div className="couples">
                {filterLessons(dayLessons).map((lesson) => {
                    return <DayLesson key={lesson._id} lesson={lesson}/>;
                })}
            </div>
        </div>
    );

    return (
        <div className="shadow-container shedule-day col-10 p-0">
            {isEmptyLessons && <NavWeek/>}
            <div className="sheldue-day-cont main-cont">
                {isEmptyLessons ? lessons : <div className="no-lessons">Нет пар</div>}
            </div>
        </div>
    );
}

export default observer(ScheduleDay);
