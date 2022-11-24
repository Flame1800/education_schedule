import React, {useEffect, useState} from 'react';
import './sheduleAllGroups.scss';
import {observer} from "mobx-react-lite";
import scheduleStore from "../../store/scheduleStore";
import WeekLesson from "../Lesson/WeekLesson/WeekLesson";
import filterLessons from "../../utils/filterLessons";
import _ from "lodash";
import 'swiper/swiper.scss';
import filterStore from "../../store/filterStore";
import LessonsSlider from "./LessonsSlider";
import NawWeek from "../NawWeek/NawWeek";
import datesStore from "../../store/datesStore";
import {Link} from "react-router-dom";

function ScheduleAllGroups() {
    const {currLessons} = scheduleStore
    const {mode} = filterStore
    const {currDay} = datesStore
    const [dayLessons, setDayLessons] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const value = mode === "allGroups" ? "group.name" : "cabinet.number";

        const lessonsToday = _.sortBy(currLessons.filter(lesson => lesson.date === currDay), value)
        const groupLessons = _.groupBy(lessonsToday, value)
        const lessonsGroupPairs = Object.entries(groupLessons)

        setDayLessons(lessonsGroupPairs)
        setLoading(false)
    }, [currDay, currLessons, mode])

    useEffect(() => {
        document.body.style.zoom = 0.7
    }, [])

    const generateLessons = (dayLessons) => {
        const fLessons = filterLessons(dayLessons);
        return fLessons.map((lesson) => {
            return <WeekLesson key={lesson._id} lesson={lesson}/>
        });
    }


    const firstHalf = dayLessons.filter((_, i) => i <= dayLessons.length / 2)
    const secondHalf = dayLessons.filter((_, i) => i >= dayLessons.length / 2)


    if (mode === 'cabs') {
        return (
            <div className='container-all'>
                <Link to="/timetable">
                    <div className="back-btn">Назад</div>
                </Link>
                <div className="schedule-all">
                    <div className="cabs">
                        <NawWeek/>
                        {dayLessons.length === 0 && <div className='empty-lesson'>Нет пар</div>}
                        <div className="cab-items">
                            {dayLessons.length > 0 && dayLessons.map(pair => {
                                const [groupName, groupLessons] = pair
                                const groupNameComponent = <div
                                    className="group">{groupName === "undefined" ? "***" : groupName}</div>

                                return (
                                    <div className="container-day" key={groupName}>
                                        <div className="row-items">
                                            <div className="head">
                                                {groupNameComponent}
                                            </div>
                                            <div className="lesson-cont">
                                                {generateLessons(groupLessons)}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (loading) {
        return <div className="state-banner">Загрзка</div>
    }

    if (dayLessons.length === 0 && !loading) {
        return <div className="state-banner">Нет пар</div>
    }

    return (
        <div className='container-all'>
            {firstHalf.length > 0 && <LessonsSlider lessons={firstHalf}/>}
            {secondHalf.length > 0 && <LessonsSlider lessons={secondHalf} pagination={true}/>}
        </div>
    );
}

export default observer(ScheduleAllGroups);