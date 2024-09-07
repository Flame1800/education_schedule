import React from 'react';
import LessonCard from "./LessonCard";
import getSubjectName from "../../../lib/getSubjectName";
import filterStore from "../../../store/filterStore";
import EmptyLesson from "./EmptyLesson/EmptyLesson";
import DoubleLessonCard from './DoubleLessonCard'
import '../lesson.scss'
import { CabNum, LessonName, Meta, MetaText } from "./WeekLesson.style";
import styled, { css } from "styled-components";
import { Content, LessonWrap, Num, LessonHead, Time, MinLessonWrap } from "./WeekLesson.style";

const WeekLesson = ({ lesson, day }) => {

    const { mode } = filterStore
    const isDouble = Array.isArray(lesson)

    const isMonday = day.weekday === 1
    const lessonNum = isDouble ? lesson[0].lessonNumber : lesson.lessonNumber

    if (getSubjectName(lesson) === "Нет пары" || getSubjectName(lesson) === 'Разговоры о важном') {
        return <EmptyLesson height={isMonday && '83px'} lesson={lesson} />
    }

    const cab = (
        <CabNum>
            {mode === 'cabinet' ? lesson.group?.name.toLowerCase() : lesson.cabinet?.number.toLowerCase() || "***"}
        </CabNum>
    )

    const getCabCouple = (couple) => {
        if (couple.length === 0) return [];

        const elements = [];

        for (let i = 0; i < couple.length; i++) {
            const arrColor = ['oneCircleCab' , 'twoCircleCab']
            elements.push(
                <WrapperCab>
                    <div className={arrColor[i]}></div>
                    <CabNum key={i}>
                        {mode === 'cabinet' ? couple[i].group.name.toLowerCase() : couple[i].cabinet?.number.toLowerCase() || null}
                    </CabNum>
                </WrapperCab>
            );
        }
        return elements;
    };

    const lessonContent = (
        <>
            <Content>
                {isDouble ? <DoubleLessonCard lesson={lesson} /> : <LessonCard lesson={lesson} />}
            </Content>
            <NavCabTime>
                <Time>
                    {isDouble ? lesson[0].timeStart : lesson.timeStart}
                    -
                    {isDouble ? lesson[0].timeEnd : lesson.timeEnd}
                </Time>
                {!isDouble ? cab : getCabCouple(lesson)}
            </NavCabTime>
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

const NavCabTime = styled.div`
    display flex;
    align-items: flex-end;
    width: 100%;
`
const WrapperCab = styled.div`
`

export default WeekLesson;