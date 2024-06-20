import React, { Fragment } from "react";
import WeekLesson from "../../../Lesson/WeekLesson/WeekLesson";
import "swiper/swiper.scss";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/dist/css/splide.min.css";
import "@splidejs/react-splide/dist/css/splide-core.min.css";
import "@splidejs/splide/dist/css/splide.min.css";
import "@splidejs/splide/dist/css/splide-core.min.css";
import groupColors from "../../../../assets/groupColors";
import datesStore from "../../../../store/datesStore";
import fillEmptyLessons from "../../../../lib/fillEmptyLessons";
import TalksPromoInfo from "../../../Lesson/WeekLesson/TalksPromoInfo";
import { DateTime } from "luxon";
import styled from "styled-components";

const LessonsSlider = ({ lessons }) => {
    const { currDay } = datesStore;
    const isNotSliderMode = lessons.length <= 10;

    const generateLessons = (dayLessons, day) => {
        const fLessons = fillEmptyLessons(dayLessons, day);

        return fLessons.map((lesson, i) => {
            const isMonday = DateTime.fromISO(currDay).weekday === 1;

            const isTalks =
                lesson.lessonNumber === 1 || lesson.lessonNumber === 4;

            return (
                <Fragment key={lesson._id + " generatedLessons " + i}>
                    {isTalks && isMonday && (
                        <TalksPromoInfo pair={lesson.lessonNumber} />
                    )}
                    <WeekLesson day={currDay} lesson={lesson} />
                </Fragment>
            );
        });
    };

    const lessonItems = lessons.map((pair) => {
        const [groupName, groupLessons] = pair;

        const groupNameComponent = <div className="group">{groupName}</div>;

        const groupLilName = groupName.split("-")[0];

        const lessonContainer = (
            <div className="container-day" key={groupName + "lessonContainer"}>
                <div className="row-items">
                    <div
                        className="head"
                        key={groupName + "lesson-head"}
                        style={{ background: groupColors[groupLilName] }}
                    >
                        {groupNameComponent}
                    </div>
                    <div key={groupName + "lesson-count"} className="lesson-cont">
                        {generateLessons(groupLessons)}
                    </div>
                </div>
            </div>
        );

        if (isNotSliderMode) {
            return lessonContainer;
        }

        return (
            <SplideSlide key={groupName + "splideSlide"}>
                {lessonContainer}
            </SplideSlide>
        );
    });

    if (lessons.length <= 10) {
        return <div className="schedule-all">{lessonItems}</div>;
    }

    return (
        <Wrapper className="schedule-all">
            <Splide
                options={{
                    rewind: true,
                    width: "99%",
                    gap: "10px",
                    perPage: Math.floor(window.innerWidth / 232) - 1,
                    perMove: Math.floor(window.innerWidth / 232) - 1,
                    autoplay: true,
                    type: "loop",
                    interval: 20000,
                    arrows: false,
                }}
            >
                {lessonItems}
            </Splide>

            <div className="splide__progress">
                <div className="splide__progress__bar"></div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .splide__progress__bar {
        height: 3px;
        background: #ccc;
    }
`;

export default LessonsSlider;
