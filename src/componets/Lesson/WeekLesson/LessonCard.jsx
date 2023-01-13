import React from 'react';
import getSubjectName from "../../../lib/getSubjectName";
import filterStore from "../../../store/filterStore";
import {CabNum, LessonName, Meta, MetaText} from "./WeekLesson.style";

const LessonCard = ({lesson}) => {
    const {mode} = filterStore

    const personalInfo = (
        <MetaText>
            {mode !== 'teacher' ? lesson.teacher.abb_name : lesson.group.name}
        </MetaText>
    )

    const cab = (
        <CabNum>
            {lesson.cabinet?.number || "***"}
        </CabNum>
    )

    return (
        <>
            <LessonName>{getSubjectName(lesson)}</LessonName>
            <Meta>
                {personalInfo}
                {cab}
            </Meta>
        </>
    );
};

export default LessonCard;