import React from 'react';
import getSubjectName from "../../../utils/getSubjectName";

const DoubleLessonCard = ({lesson}) => {
    const [firstCouple, secondCouple] = lesson

    const getCab = (couple) => {
        return (
            <div className="cab">
                <div className="flag-icon"></div>
                {couple.cabinet ? couple.cabinet.number : null}
            </div>
        )
    }


    const getHeader = (couple) => {
        return (
            <div className="head-card head-card-min">
                <div className="name">{getSubjectName(couple)}</div>
                <div className="teacher">
                    <div className="name-min">{couple.teacher.abb_name}</div>
                </div>
                {getCab(couple)}
            </div>
        )
    }


    return (
        <>
            <div className="headers">
                {getHeader(firstCouple)}
                {getHeader(secondCouple)}
            </div>
        </>
    );
};

export default DoubleLessonCard;