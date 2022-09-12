import React from 'react';

const EmptyLesson = ({lesson}) => {
    return (
        <div className='lesson'>
            <div className="item none">
                <div className="num">{lesson.lessonNumber}</div>
            </div>
        </div>
    );
};

export default EmptyLesson;