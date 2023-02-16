import React from 'react';
import LessonCard from "./LessonCard";
import getSubjectName from "../../../lib/getSubjectName";
import EmptyLesson from "./EmptyLesson";
import {LessonCardWrapper, LessonContent, NumLessons, Time} from "./DayLesson.styled";

const DayLesson = ({lesson}) => {
    const isDouble = Array.isArray(lesson)


    const doubleCouple = (
        <>
            <LessonCard lesson={lesson[0]}/>
            <LessonCard lesson={lesson[1]}/>
        </>
    )

    if (getSubjectName(lesson) === "Нет пары") {
        return <EmptyLesson lesson={lesson}/>
    }

    return (
        <LessonCardWrapper>
            <NumLessons>{isDouble ? lesson[0].lessonNumber : lesson.lessonNumber}</NumLessons>
            <LessonContent>
                {isDouble ? doubleCouple : <LessonCard lesson={lesson}/>}
                <Time>
                    {isDouble ? lesson[0].timeStart : lesson.timeStart}
                    -
                    {isDouble ? lesson[0].timeEnd : lesson.timeEnd}
                </Time>
            </LessonContent>
        </LessonCardWrapper>
    );
};

export default DayLesson;