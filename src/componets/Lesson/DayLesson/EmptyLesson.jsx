import React from 'react';
import getSubjectName from "../../../lib/getSubjectName";
import {EmptyLessonStyle, LessonCardWrapper, LessonContent, NumLessons} from "./DayLesson.styled";

const EmptyLesson = ({lesson}) => {
    return (
        <LessonCardWrapper>
            <NumLessons>{lesson.lessonNumber}</NumLessons>
            <EmptyLessonStyle>
                <span>{getSubjectName(lesson)}</span>
            </EmptyLessonStyle>
        </LessonCardWrapper>
    );
};

export default EmptyLesson;