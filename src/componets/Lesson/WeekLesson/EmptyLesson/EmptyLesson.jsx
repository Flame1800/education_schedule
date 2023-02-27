import React from 'react';
import {UnactiveLesson} from "../WeekLesson.style";
import styled from "styled-components";

const EmptyLesson = ({lesson, height}) => {
    return (
        <UnactiveLesson h={height}>
            <ItemNone>
                <span>{lesson.lessonNumber}</span>
            </ItemNone>
        </UnactiveLesson>
    );
};

const ItemNone = styled.div`

  span {
    font-size: 48px;
    font-weight: bold;
    color: rgba(189, 189, 189, 0.27);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
  }
`

export default EmptyLesson;