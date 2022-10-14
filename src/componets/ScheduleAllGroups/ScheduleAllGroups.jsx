import React from 'react';
import './sheduleAllGroups.scss';
import {observer} from "mobx-react-lite";
import scheduleStore from "../../store/scheduleStore";
import WeekLesson from "../Lesson/WeekLesson/WeekLesson";
import filterLessons from "../../utils/filterLessons";
import {DateTime} from "luxon";
import _ from "lodash";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay} from "swiper";
import 'swiper/swiper.scss';
import Banner from '../../assets/img/banner.png'

const breakpoints = {
    // when window width is >= 320px
    320: {
        slidesPerView: 1,
        spaceBetween: 20
    },
    // when window width is >= 480px
    480: {
        slidesPerView: 2,
        spaceBetween: 10
    },
    // when window width is >= 640px
    640: {
        slidesPerView: 3,
        spaceBetween: 10
    },
    1600: {
        slidesPerView: 6,
        spaceBetween: 10
    },
    2000: {
        slidesPerView: 10,
        spaceBetween: 10
    }
}

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

    const getMarqueeLessons = (lessons) => {
        return (
            <div className="schedule-all">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={0}
                    slidesPerView={10}
                    slidesPerGroup={10}
                    speed={6000}
                    breakpoints={breakpoints}
                    autoplay={{delay: 12000}}
                    loop={true}
                >
                    {lessons.map(pair => {
                        const [groupName, groupLessons] = pair
                        const groupNameComponent = <div className="group">{groupName}</div>

                        return (
                            <SwiperSlide key={groupName}>
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
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        )
    }


    return (
        <>
            <img src={Banner} alt="banner" className="add-banner"/>
            <div className='container-all'>
                {getMarqueeLessons(firstHalf, 65)}
                {getMarqueeLessons(secondHalf, 75)}
            </div>
        </>

    );
}

export default observer(ScheduleAllGroups);