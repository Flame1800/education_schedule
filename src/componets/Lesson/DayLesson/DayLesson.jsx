import React from 'react';
import LessonCard from "./LessonCard";
import getSubjectName from "../../../lib/getSubjectName";
import EmptyLesson from "./EmptyLesson";
import {DayLessonWrapper, LessonCardWrapper, LessonContent, NumLessons} from "./DayLesson.styled";

const DayLesson = ({lesson}) => {
    const isDouble = Array.isArray(lesson)


    const numLesson = <NumLessons>{isDouble ? lesson[0].lessonNumber : lesson.lessonNumber}</NumLessons>

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
            {numLesson}
            <LessonContent>
                {isDouble ? doubleCouple : <LessonCard lesson={lesson}/>}
            </LessonContent>
        </LessonCardWrapper>
    );
};

export default DayLesson;