import React from 'react';
import getSubjectName from "../../../lib/getSubjectName";
import { CabNum, ShortLessonName, MetaText, MinCont } from "./WeekLesson.style";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import filterStore from "../../../store/filterStore";

const DoubleLessonCard = ({ lesson }) => {
    const [renderFirstCouple, renderSecondCouple] = lesson
    const { mode } = filterStore

    const getHeader = (couple) => {
        return (
            <MinCont>
                <Column>
                    <ShortLessonName>{getSubjectName(couple)}</ShortLessonName>
                    <div className='wrapperCircle'>
                        <div className="oneCircle" />
                        <MetaText>
                            <div className='textTwoPair'>{mode !== 'teacher' ? couple.teacher.abb_name.slice(0, -1) : couple.group.name.slice(0, -1)}</div>
                        </MetaText>
                    </div>
                </Column>
            </MinCont>
        )
    }

    const renderSecondLesson = (couple) => {
        return (
            <MinCont>
                <Column>
                    <CabAndText>
                        <div className='wrapperCircle'>
                            <div className="twoCircle" />
                            <MetaText>
                                <div className='textTwoPair'>{mode !== 'teacher' ? couple.teacher.abb_name.slice(0, -1) : couple.group.name.slice(0, -1)}</div>
                            </MetaText>
                        </div>
                    </CabAndText>
                </Column>
            </MinCont>
        )
    }


    return (
        <Wrap>
            {getHeader(renderFirstCouple)}
            {renderSecondLesson(renderSecondCouple)}
        </Wrap>
    );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`
const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const CabAndText = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

export default observer(DoubleLessonCard);