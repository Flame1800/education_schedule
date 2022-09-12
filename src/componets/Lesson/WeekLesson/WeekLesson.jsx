import React from 'react';
import LessonCard from "./LessonCard";
import getSubjectName from "../../../utils/getSubjectName";
import EmptyLesson from "./EmptyLesson";
import DoubleLessonCard from './DoubleLessonCard'
import '../lesson.scss'

const WeekLesson = ({lesson}) => {
    const isDouble = Array.isArray(lesson)

    const numLesson = <div className="num-lesson">{isDouble ? lesson[0].lessonNumber : lesson.lessonNumber}</div>


    if (getSubjectName(lesson) === "Нет пары") {
        return <EmptyLesson lesson={lesson}/>
    }

    return (
        <div className='lesson'>
            <div className="item active">
                {numLesson}
                <div className='couple'>
                    {isDouble ? <DoubleLessonCard lesson={lesson}/> : <LessonCard lesson={lesson}/>}
                </div>
            </div>
        </div>
    );
};

export default WeekLesson;