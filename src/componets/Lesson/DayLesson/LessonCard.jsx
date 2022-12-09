import React from 'react';
import getSubjectName from "../../../lib/getSubjectName";
import filterStore from "../../../store/filterStore";
import {Cab, HeadCardLesson, InfoTitle, LessonCardContainer, Sign, SubTitle} from "./DayLesson.styled";

const LessonCard = ({lesson}) => {
    const {mode} = filterStore

    return (
        <LessonCardContainer>
            <div>
                <InfoTitle>{getSubjectName(lesson)}</InfoTitle>
                <SubTitle>
                    {mode !== 'teacher' ? lesson.teacher?.abb_name : lesson.group?.name}
                </SubTitle>
            </div>
            <div>
                {lesson.subgroup !== 0 && <Sign>{lesson.subgroup}</Sign>}
                <Cab>{lesson.cabinet?.number || "***"}</Cab>
            </div>
        </LessonCardContainer>
    );
};

export default LessonCard;