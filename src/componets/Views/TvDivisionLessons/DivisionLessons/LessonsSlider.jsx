import React from 'react';
import {Autoplay, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import filterLessons from "../../../../lib/fillEmptyLessons";
import WeekLesson from "../../../Lesson/WeekLesson/WeekLesson";
import 'swiper/swiper.scss';
import datesStore from "../../../../store/datesStore";


const LessonsSlider = ({lessons, pagination}) => {
    const getBreakpoint = (num) => {
        return {
            slidesPerView: lessons.length < num ? lessons.length : num,
            slidesPerGroup: lessons.length < num ? lessons.length : num,
            spaceBetween: 10
        }
    }

    const breakpoints = {
        // when window width is >= 320px
        120: getBreakpoint(1),
        460: getBreakpoint(2),
        660: getBreakpoint(3),
        850: getBreakpoint(4),
        1200: getBreakpoint(6),
        1700: getBreakpoint(7),
        2000: getBreakpoint(9),
        2300: getBreakpoint(10),
        2600: getBreakpoint(12)
    }

    const isNotSliderMode = lessons.length <= 10


    const generateLessons = (dayLessons) => {
        const fLessons = filterLessons(dayLessons);
        return fLessons.map((lesson, id) => <WeekLesson key={id} lesson={lesson}/>);
    }

    const lessonItems = lessons.map(pair => {
        const [groupName, groupLessons] = pair
        const groupNameComponent = <div className="group">{groupName}</div>

        const lessonContainer = (
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

        if (isNotSliderMode) {
            return lessonContainer
        }

        return (
            <SwiperSlide key={groupName}>
                {lessonContainer}
            </SwiperSlide>
        )
    })

    if (lessons.length <= 10) {
        return (
            <div className="schedule-all">
                {lessonItems}
            </div>
        )
    }


    return (
        <div className="schedule-all">
            <Swiper
                modules={pagination ? [Autoplay, Pagination] : [Autoplay]}
                spaceBetween={10}
                slidesPerView={lessons.length < 10 ? lessons.length : 10}
                slidesPerGroup={lessons.length < 10 ? lessons.length : 10}
                speed={1500}
                autoplay={{delay: 12000, disableOnInteraction: false}}
                loop={true}
                breakpoints={breakpoints}
                pagination={{
                    type: "fraction",
                }}
            >
                {lessonItems}
            </Swiper>
        </div>
    );
};

export default LessonsSlider;
