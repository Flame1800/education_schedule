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

function ScheduleAllGroups() {
    const {currLessons, setLessons} = scheduleStore
    const {mode, setMode} = filterStore
    const {currDay} = datesStore
    const [dayLessons, setDayLessons] = useState([])

    useEffect(() => {
        const value = mode === "allGroups" ? "group.name" : "cabinet.number";

        const lessonsToday = _.sortBy(currLessons.filter(lesson => lesson.date === currDay), value)
        const groupLessons = _.groupBy(lessonsToday, value)
        const lessonsGroupPairs = Object.entries(groupLessons)

        setDayLessons(lessonsGroupPairs)
    }, [currDay, currLessons, mode])

    const generateLessons = (dayLessons) => {
        const fLessons = filterLessons(dayLessons);
        return fLessons.map((lesson) => <WeekLesson key={lesson._id} lesson={lesson}/>);
    }


    const firstHalf = dayLessons.filter((_, i) => i <= dayLessons.length / 2)
    const secondHalf = dayLessons.filter((_, i) => i >= dayLessons.length / 2)

    const openFilterHandle = () => {
        setLessons([])
        setMode('group')
    }

    if (mode === 'cabs') {
        return (
            <div className='container-all'>
                <div className="back-btn" onClick={openFilterHandle}>Назад</div>
                <div className="schedule-all">
                    <div className="cabs">
                        <NawWeek/>
                        <div className="cab-items">
                            {dayLessons.map(pair => {
                                const [groupName, groupLessons] = pair
                                const groupNameComponent = <div
                                    className="group">{groupName === "undefined" ? "***" : groupName}</div>

                                return (
                                    <div className="container-day">
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

    return (
        <>
            <div className='container-all'>
                <LessonsSlider lessons={firstHalf}/>
                <LessonsSlider lessons={secondHalf} pagination={true}/>
            </div>
            {false && <img src={""} alt="banner" className="add-banner"/>}
        </>
    );
}

export default observer(ScheduleAllGroups);