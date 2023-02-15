import React from 'react';
import getSubjectName from "../../../lib/getSubjectName";
import {CabNum, ShortLessonName, MetaText, MinCont} from "./WeekLesson.style";
import styled from "styled-components";
import {observer} from "mobx-react-lite";
import filterStore from "../../../store/filterStore";

const DoubleLessonCard = ({lesson}) => {
    const [firstCouple, secondCouple] = lesson
    const {mode} = filterStore


    const getCab = (couple) => {
        return (
            <CabNum>
                {mode === 'cabinet' ? couple.group.name : couple.cabinet?.number || null}
            </CabNum>
        )
    }


    const getHeader = (couple) => {
        return (
            <MinCont>
                <ShortLessonName>{getSubjectName(couple)}</ShortLessonName>
                <MetaText>
                    <div className="name-min">{mode !== 'teacher' ? couple.teacher.abb_name : couple.group.name}</div>
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

export default observer(DoubleLessonCard);