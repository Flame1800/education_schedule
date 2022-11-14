import React from 'react';
import './sheduleAllGroups.scss';
import {observer} from "mobx-react-lite";
import scheduleStore from "../../store/scheduleStore";
import WeekLesson from "../Lesson/WeekLesson/WeekLesson";
import filterLessons from "../../utils/filterLessons";
import {DateTime} from "luxon";
import _ from "lodash";
import {SwiperSlide} from 'swiper/react';
import 'swiper/swiper.scss';
import filterStore from "../../store/filterStore";
import LessonsSlider from "./LessonsSlider";

function ScheduleAllGroups() {
    const {currLessons} = scheduleStore
    const {mode} = filterStore


    const generateLessons = (dayLessons) => {
        const fLessons = filterLessons(dayLessons);
        return fLessons.map((lesson) => <WeekLesson key={lesson._id} lesson={lesson}/>);
    }

    const value = mode === "allGroups" ? "group.name" : "cabinet.number";

    const today = DateTime.now().toISODate()
    const lessonsToday = _.sortBy(currLessons.filter(lesson => lesson.date === today), value)
    const groupLessons = _.groupBy(lessonsToday, value)
    const lessonsGroupPairs = Object.entries(groupLessons)

    const firstHalf = lessonsGroupPairs.filter((_, i) => i <= lessonsGroupPairs.length / 2)
    const secondHalf = lessonsGroupPairs.filter((_, i) => i >= lessonsGroupPairs.length / 2)


    if (mode === 'cabs') {
        return (
            <div className='container-all'>
                <div className="schedule-all">
                    <div className="cabs">
                        {lessonsGroupPairs.map(pair => {
                            const [groupName, groupLessons] = pair
                            const groupNameComponent = <div
                                className="group">{groupName === "undefined" ? "***" : groupName}</div>
                            console.log(groupName)

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