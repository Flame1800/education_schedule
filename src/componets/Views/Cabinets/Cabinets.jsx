import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import NawWeek from "../../NawWeek/NawWeek";
import filterLessons from "../../../lib/filterLessons";
import WeekLesson from "../../Lesson/WeekLesson/WeekLesson";
import scheduleStore from "../../../store/scheduleStore";
import {observer} from "mobx-react-lite";
import datesStore from "../../../store/datesStore";
import {toJS} from "mobx";
import groupLessons from "../../../lib/groupLessons";
import _ from "lodash";

const Cabinets = () => {
    const {getLessonsForCabinets, currLessons} = scheduleStore
    const [dayLessons, setDayLessons] = React.useState([])

    const {currDay} = datesStore
    const {id} = useParams()


    useEffect(() => {
        (async () => {
            const lessons = await getLessonsForCabinets(id)
            const lessonsToday = _.sortBy(lessons.filter(lesson => lesson.date === datesStore.currDay), "cabinet.number")
            const groupLessons = _.groupBy(lessonsToday, "cabinet.number")
            setDayLessons(Object.entries(groupLessons))
        })()
    }, [])


    React.useEffect(() => {
        const lessonsToday = _.sortBy(currLessons.filter(lesson => lesson.date === datesStore.currDay), "cabinet.number")
        const groupLessons = _.groupBy(lessonsToday, "cabinet.number")
        setDayLessons(Object.entries(groupLessons))
    }, [currDay])

    const emptyLesson = dayLessons.length === 0 && <div className='empty-lesson'>Нет пар</div>


    return (
        <div className='container-all'>
            <Link to="/timetable">
                <div className="back-btn">Назад</div>
            </Link>
            <div className="schedule-all">
                <div className="cabs">
                    {dayLessons.length !== 0 && <NawWeek/>}
                    {emptyLesson}
                    <div className="cab-items">
                        {dayLessons.length > 0 && dayLessons.map(pair => {
                            const [groupName, lessons] = pair
                            const groupNameMapped = groupName === "undefined" ? "***" : groupName


                            return (
                                <div className="container-day" key={groupName}>
                                    <div className="row-items">
                                        <div className="head">
                                            <div className="group">{groupNameMapped}</div>
                                        </div>
                                        <div className="lesson-cont">
                                            {filterLessons(lessons).map((lesson) => {
                                                return <WeekLesson key={lesson._id} lesson={lesson}/>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(Cabinets);