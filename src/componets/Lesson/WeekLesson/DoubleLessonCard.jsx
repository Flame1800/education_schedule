import React from 'react';
import getSubjectName from "../../../lib/getSubjectName";
import {CabNum, ShortLessonName, MetaText, MinCont} from "./WeekLesson.style";
import styled from "styled-components";

const DoubleLessonCard = ({lesson}) => {
    const [firstCouple, secondCouple] = lesson

    const getCab = (couple) => {
        return (
            <CabNum>
                <div className="flag-icon"></div>
                {couple.cabinet ? couple.cabinet.number : null}
            </CabNum>
        )
    }


    const getHeader = (couple) => {
        return (
            <MinCont>
                <ShortLessonName>{getSubjectName(couple)}</ShortLessonName>
                <MetaText>
                    <div className="name-min">{couple.teacher.abb_name}</div>
                </MetaText>
                {getCab(couple)}
            </MinCont>
        )
    }


    return (
        <Wrap>
            {getHeader(firstCouple)}
            {getHeader(secondCouple)}
        </Wrap>
    );
};

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
`

export default DoubleLessonCard;