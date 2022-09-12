import React from 'react';
import './sheduleAllGroups.scss';
import {observer} from "mobx-react-lite";
import scheduleStore from "../../store/scheduleStore";
import WeekLesson from "../Lesson/WeekLesson/WeekLesson";
import filterLessons from "../../utils/filterLessons";
import {DateTime} from "luxon";
import _ from "lodash";
import Marquee from "react-fast-marquee";

function ScheduleAllGroups() {
    const {currLessons} = scheduleStore

    const generateLessons = (dayLessons) => {
        const fLessons = filterLessons(dayLessons);
        return fLessons.map((lesson) => <WeekLesson key={lesson._id} lesson={lesson}/>);
    }


    const today = DateTime.now().toISODate()
    const lessonsToday = currLessons.filter(lesson => lesson.date === today)
    const groupLessons = _.groupBy(lessonsToday, 'group.name')
    const lessonsGroupPairs = Object.entries(groupLessons)

    const firstHalf = lessonsGroupPairs.filter((_, i) => i <= lessonsGroupPairs.length / 2)
    const secondHalf = lessonsGroupPairs.filter((_, i) => i >= lessonsGroupPairs.length / 2)


    return (
        <>
            <div className="schedule-all">
                <Marquee speed={120}>
                    {firstHalf.map(pair => {
                        const [groupName, groupLessons] = pair
                        const groupNameComponent = <div className="day-week">{groupName}</div>

                        return (
                            <div className="container-day" key={groupName}>
                                <div className="row-items">
                                    <div className="head">
                                        {groupNameComponent}
                                        <div className="min-cont">
                                            <div className="day">{groupLessons[0].date}</div>
                                        </div>
                                    </div>
                                    <div className="lesson-cont">
                                        {generateLessons(groupLessons)}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Marquee>
            </div>
            <div className="schedule-all">
                <Marquee speed={120}>
                    {secondHalf.map(pair => {
                        const [groupName, groupLessons] = pair
                        const groupNameComponent = <div className="day-week">{groupName}</div>

                        return (
                            <div className="container-day" key={groupName}>
                                <div className="row-items">
                                    <div className="head">
                                        {groupNameComponent}
                                        <div className="min-cont">
                                            <div className="day">{groupLessons[0].date}</div>
                                        </div>
                                    </div>
                                    <div className="lesson-cont">
                                        {generateLessons(groupLessons)}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Marquee>
            </div>
        </>

    );

}

export default observer(ScheduleAllGroups);