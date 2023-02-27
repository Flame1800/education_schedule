import React from 'react';
import LessonCard from "./LessonCard";
import getSubjectName from "../../../lib/getSubjectName";
import EmptyLesson from "./EmptyLesson/EmptyLesson";
import DoubleLessonCard from './DoubleLessonCard'
import '../lesson.scss'
import {Content, LessonWrap, Num, LessonHead, Time, MinLessonWrap} from "./WeekLesson.style";

const WeekLesson = ({lesson, day}) => {
    const isDouble = Array.isArray(lesson)


    const isMonday = day.weekday === 1
    const lessonNum = isDouble ? lesson[0].lessonNumber : lesson.lessonNumber


    if (getSubjectName(lesson) === "Нет пары" || getSubjectName(lesson) === 'Разговоры о важном') {

        return <EmptyLesson height={isMonday && '83px'} lesson={lesson}/>
    }

    const lessonContent = (
        <>
            <LessonHead>
                <Num>{lessonNum}</Num>
                <Time>
                    {isDouble ? lesson[0].timeStart : lesson.timeStart}
                    -
                    {isDouble ? lesson[0].timeEnd : lesson.timeEnd}
                </Time>
            </LessonHead>
            <Content>
                {isDouble ? <DoubleLessonCard lesson={lesson}/> : <LessonCard lesson={lesson}/>}
            </Content>
        </>
    )

    if (isMonday) {
        return (
            <MinLessonWrap>
                {lessonContent}
            </MinLessonWrap>
        )
    }

    return (
        <LessonWrap>
            {lessonContent}
        </LessonWrap>
    );
};


export default WeekLesson;