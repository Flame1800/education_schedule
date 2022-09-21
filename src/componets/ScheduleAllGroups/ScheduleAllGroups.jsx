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
    const lessonsToday = _.sortBy(currLessons.filter(lesson => lesson.date === today), 'group.name')
    const groupLessons = _.groupBy(lessonsToday, 'group.name')
    const lessonsGroupPairs = Object.entries(groupLessons)

    const firstHalf = lessonsGroupPairs.filter((_, i) => i <= lessonsGroupPairs.length / 2)
    const secondHalf = lessonsGroupPairs.filter((_, i) => i >= lessonsGroupPairs.length / 2)

    const getMarqueeLessons = (lessons, speed) => {
        return (
            <div className="schedule-all">
                <Marquee speed={speed}>
                    {lessons.map(pair => {
                        const [groupName, groupLessons] = pair
                        const groupNameComponent = <div className="group">{groupName}</div>

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
                </Marquee>
            </div>
        )
    }


    return (
        <div className='container-all'>
            {getMarqueeLessons(firstHalf, 65)}
            {getMarqueeLessons(secondHalf, 75)}
        </div>

    );

}

export default observer(ScheduleAllGroups);