import React from 'react';
import getSubjectName from "../../../lib/getSubjectName";
import filterStore from "../../../store/filterStore";
import { CabNum, LessonName, Meta, MetaText } from "./WeekLesson.style";
import { observer } from "mobx-react-lite";
import styled, { css } from "styled-components";

const LessonCard = ({ lesson }) => {
    const { mode } = filterStore
    const personalInfo = (
        <MetaText>
            {mode !== 'teacher' ? lesson.teacher.abb_name.slice(0, -1) : lesson.group.name.slice(0, -1)}
        </MetaText>
    )

    return (
        <>
            <Meta>
                <Column>
                    <LessonName>{getSubjectName(lesson)}</LessonName>
                    {personalInfo}
                </Column>
            </Meta>
        </>
    );
};
const Column = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

export default observer(LessonCard);