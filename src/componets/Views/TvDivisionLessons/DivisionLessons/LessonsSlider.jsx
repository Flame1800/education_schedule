import React, { useEffect, useState } from 'react';
import WeekLesson from "../../../Lesson/WeekLesson/WeekLesson";
import 'swiper/swiper.scss';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/dist/css/splide.min.css';
import '@splidejs/react-splide/dist/css/splide-core.min.css';
import '@splidejs/splide/dist/css/splide.min.css';
import '@splidejs/splide/dist/css/splide-core.min.css';
import groupColors from "../../../../assets/groupColors";
import datesStore from "../../../../store/datesStore";
import fillEmptyLessons from "../../../../lib/fillEmptyLessons";
import TalksPromoInfo from "../../../Lesson/WeekLesson/TalksPromoInfo";
import { DateTime } from "luxon";
import { beautyDate } from '../../../../lib/beautyDate';
import styled from 'styled-components';
import CurrentTime from './CurrentTime'


const LessonsSlider = ({ lessons }) => {
    const dateUpper = beautyDate(datesStore.currDay);
    const timeInHours = CurrentTime();
    const dayOfTheWeek = dateUpper[0].toUpperCase() + dateUpper.substring(1).split(",")[0];
    const [animateState, setAnimateState] = useState('animateStateOne');
    const { currDay } = datesStore
    const isNotSliderMode = lessons.length <= 6
    const flagShift = (timeInHours.props.children > '13:00') ? 2 : 1;


    const generateLessons = (dayLessons , day) => {
        const fLessons = fillEmptyLessons(dayLessons , day);

        return fLessons.map((lesson) => {
            const isMonday = DateTime.fromISO(currDay).weekday === 1
            const isTalks = lesson.lessonNumber === 1 || lesson.lessonNumber === 4
            return (<>
                {isTalks && isMonday && <TalksPromoInfo pair={lesson.lessonNumber} />}
                <WeekLesson key={lesson._id} day={currDay} lesson={lesson} />
            </>)
        });
    }
    const mediaDayClass = lessons[0][1][0].division.name === '№2, Рабочая 43/1' ? 'container-day-eightPairs' : 'container-day';
    const mediaSwiperDiv = lessons[0][1][0].division.name === '№2, Рабочая 43/1' ? 'swiper-div-eightPairs' : 'swiper-div';

    const lessonItems = lessons.map(pair => {

        const [groupName, groupLessons] = pair

        const groupNameComponent = <div className="group">{groupName}</div>
        const groupLilName = groupName.split('-')[0]

        const lessonContainer = (
            <div className={mediaDayClass} key={groupName}>
                <div className="row-items">
                    <div className="head" style={{ background: groupColors[groupLilName] }}>
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

    const noSliderDiv = {
        display: 'flex',
        gap: '20px'
    }

    if (lessons.length <= 3) {
        return (
            <>
                <div className="schedule-all">
                    <div className='slider-center'>
                        <span>{dayOfTheWeek}</span>
                        <div className={mediaSwiperDiv} style={noSliderDiv}>
                            {lessonItems}
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const slides = lessonItems.map((item, index) => {
        return (
            <SwiperSlide key={index}>
                {item}
            </SwiperSlide>
        );
    });

    function AnimateComponent() {
        if (animateState === 'animateStateOne') {
            setAnimateState('animateStateTwo');
        } else {
            setAnimateState('animateStateOne');
        }
        return animateState
    }

    return (
        <>
            <Wrapper className="schedule-all">
                <div className='slider-center'>
                    <div className='flex'>
                        <span className='dayOfTheWeek'>{dayOfTheWeek}</span>
                        <CurrentTime />
                        <span className='dayOfTheWeek'>{flagShift} смена</span>
                    </div>
                    <div className={mediaSwiperDiv}>
                        <Swiper
                            spaceBetween={10}
                            slidesPerGroup={6}
                            slidesPerView={6}
                            loop={true}
                            modules={[
                                Autoplay, Pagination, Navigation
                            ]}
                            autoplay={{
                                delay: 12000,
                                disableOnInteraction: false,
                            }}
                            navigation
                            pagination={{ clickable: true }}
                            onSlideChange={() => { AnimateComponent() }}
                        >
                            {slides}
                        </Swiper>
                    </div>
                    <div className="WrapperBar">
                        <div className='gray-line'>
                            <div className={animateState} id='animateBar'></div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    );
};


const Wrapper = styled.div`

  .progressBar {
    height: 7px;
    background: #FFE178;
    border-radius: 10px;
  }
  .animateStateOne {
    height: 7px;
    background: #FFE178;
    border-radius: 10px;
    animation: myAnimationStateOne 12s;
  }
  .animateStateTwo {
    height: 7px;
    background: #FFE178;
    border-radius: 10px;
    animation: myAnimationStateTwo 12s;
  }
  @keyframes myAnimationStateOne {
    0% { width: 0%; }
    100% { width: 100% }
  }
  @keyframes myAnimationStateTwo {
    0% { width: 0%; }
    100% { width: 100% }
  }
    
`

export default LessonsSlider;
