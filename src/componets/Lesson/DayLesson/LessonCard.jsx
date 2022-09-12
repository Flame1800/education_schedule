import React from 'react';
import getSubjectName from "../../../utils/getSubjectName";
import filterStore from "../../../store/filterStore";

const LessonCard = ({lesson}) => {
    const {mode} = filterStore


    const name = <div className="name">{getSubjectName(lesson)}</div>

    const personalInfo = (
        <div className="teacher">
            {mode !== 'teacher' ? lesson.teacher?.abb_name : lesson.group?.name}
        </div>
    )

    const signGroup = (
        lesson.subgroup !== 0 ? (
            <div className="sign">{lesson.subgroup}</div>
        ) : null
    )

    const cab = (
        <div className="cab">
            {lesson.cabinet?.number || "***"}
        </div>
    )

    return (
        <>
            <div className="head-card">
                <div className="titles">
                    {name}
                    {personalInfo}
                </div>
                <div className="cont">
                    <div className="min-cont">
                        {signGroup}
                        {cab}
                    </div>
                </div>
            </div>

        </>
    );
};

export default LessonCard;