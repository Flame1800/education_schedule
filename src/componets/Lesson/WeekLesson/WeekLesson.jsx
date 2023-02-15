import React from 'react';
import LessonCard from "./LessonCard";
import getSubjectName from "../../../lib/getSubjectName";
import EmptyLesson from "./EmptyLesson/EmptyLesson";
import DoubleLessonCard from './DoubleLessonCard'
import '../lesson.scss'
import {Content, LessonWrap, Num, LessonHead, Time} from "./WeekLesson.style";

const WeekLesson = ({lesson}) => {
    const isDouble = Array.isArray(lesson)

    const numLesson = <Num>{isDouble ? lesson[0].lessonNumber : lesson.lessonNumber}</Num>


    if (getSubjectName(lesson) === "Нет пары") {
        return <EmptyLesson lesson={lesson}/>
    }

    return (
        <LessonWrap>
            <LessonHead>
                {numLesson}
                <Time>{lesson.timeStart} - {lesson.timeEnd}</Time>
            </LessonHead>
            <Content>
                {isDouble ? <DoubleLessonCard lesson={lesson}/> : <LessonCard lesson={lesson}/>}
            </Content>
        </LessonWrap>
    );
};

export default WeekLesson;