import React from 'react';
import {Autoplay, FreeMode, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import filterLessons from "../../utils/filterLessons";
import WeekLesson from "../Lesson/WeekLesson/WeekLesson";

const LessonsSlider = ({lessons, pagination}) => {
    const plugins = pagination ? [Autoplay, Pagination, FreeMode] : [Autoplay, FreeMode]

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
        470: getBreakpoint(2),
        950: getBreakpoint(4),
        1200: getBreakpoint(5),
        1600: getBreakpoint(7),
        2100: getBreakpoint(8),
        2300: getBreakpoint(10)
    }

    const generateLessons = (dayLessons) => {
        const fLessons = filterLessons(dayLessons);
        return fLessons.map((lesson) => <WeekLesson key={lesson._id} lesson={lesson}/>);
    }

    return (
        <div className="schedule-all">
            <Swiper
                modules={plugins}
                spaceBetween={10}
                slidesPerView={lessons.length < 10 ? lessons.length : 10}
                slidesPerGroup={lessons.length < 10 ? lessons.length : 10}
                speed={500}
                breakpoints={breakpoints}
                autoplay={{delay: 12000}}
                loop={true}
                pagination={{
                    type: "fraction",
                }}
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
    );
};

export default LessonsSlider;