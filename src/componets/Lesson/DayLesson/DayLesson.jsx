import React from 'react';
import LessonCard from "./LessonCard";
import getSubjectName from "../../../utils/getSubjectName";
import EmptyLesson from "./EmptyLesson";

const DayLesson = ({lesson}) => {
    const isDouble = Array.isArray(lesson)


    const numLesson = <div className="num">{isDouble ? lesson[0].lessonNumber : lesson.lessonNumber}</div>

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
        <div className="item">
            {numLesson}
            <div className="couple one-couple">
                {isDouble ? doubleCouple : <LessonCard lesson={lesson}/>}
            </div>
        </div>
    );
};

export default DayLesson;