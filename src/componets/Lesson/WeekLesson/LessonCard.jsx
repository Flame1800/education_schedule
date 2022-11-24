import React from 'react';
import getSubjectName from "../../../lib/getSubjectName";
import filterStore from "../../../store/filterStore";

const LessonCard = ({lesson}) => {
    const {mode} = filterStore

    const name = <div className="name">{getSubjectName(lesson)}</div>
    const personalInfo = (
        <div className="teacher">
            {mode !== 'teacher' ? lesson.teacher.abb_name : lesson.group.name}
        </div>
    )

    const cab = (
        <div className="cab">
            {lesson.cabinet?.number || "***"}
        </div>
    )

    return (
        <>
            <div className="head-card">
                {name}
            </div>
            <div className="cont">
                {personalInfo}
                <div className="min-cont">
                    {cab}
                </div>
            </div>
        </>
    );
};

export default LessonCard;