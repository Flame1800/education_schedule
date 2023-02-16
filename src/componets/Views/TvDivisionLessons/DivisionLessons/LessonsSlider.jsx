import React from 'react';
import filterLessons from "../../../../lib/fillEmptyLessons";
import WeekLesson from "../../../Lesson/WeekLesson/WeekLesson";
import 'swiper/swiper.scss';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/dist/css/splide.min.css';
import groupColors from "../../../../assets/groupColors";


const LessonsSlider = ({lessons}) => {
    const isNotSliderMode = lessons.length <= 10

    const generateLessons = (dayLessons) => {
        const fLessons = filterLessons(dayLessons);
        return fLessons.map((lesson, id) => <WeekLesson key={id} lesson={lesson}/>);
    }

    const lessonItems = lessons.map(pair => {
        const [groupName, groupLessons] = pair
        const groupNameComponent = <div className="group">{groupName}</div>

        const groupLilName = groupName.split('-')[0]

        const lessonContainer = (
            <div className="container-day" key={groupName}>
                <div className="row-items">
                    <div className="head" style={{background: groupColors[groupLilName]}}>
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
            <SplideSlide>
                {lessonContainer}
            </SplideSlide>
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
            <Splide options={{
                rewind: true,
                width: "99%",
                gap: '10px',
                perPage: Math.floor(window.innerWidth / 232) - 1,
                perMove: Math.floor(window.innerWidth / 232) - 1,
                autoplay: true,
                type: 'loop',
                interval: 12000,
                arrows: false
            }}>
                {lessonItems}
            </Splide>
        </div>
    );
};


export default LessonsSlider;
