import React from 'react';
import getSubjectName from "../../../lib/getSubjectName";

const EmptyLesson = ({lesson}) => {
    return (
        <div className="item">
            <div className="num">{lesson.lessonNumber}</div>
            <div className="couple one-couple no-lesson">
                <div className="text">{getSubjectName(lesson)}</div>
            </div>
        </div>
    );
};

export default EmptyLesson;