import React from "react";
import "./lesson.scss";

export default function Lesson(props) {// TODO: Обернуть контент в класс "lesson" и дать mode

    const {lesson} = props;

    const getSubjectName = (lesson) => {
        return lesson.subject ? lesson.subject.name : "";
    };

    if (props.mode === "week") {
        if (getSubjectName(lesson) === "Нет пары") {
            return (
                <div className="item none">
                    <div className="num">{lesson.lessonNumber}</div>
                </div>
            );
        }

        if (props.subLesson !== null) {
            const {subLesson} = props;

            return (
                <div className="item active">
                    <div className="num-lesson">{lesson.lessonNumber}</div>
                    <div className="couple">
                        <div className="headers">
                            <div className="head-card head-card-first head-card-min">
                                <div className="name">{getSubjectName(lesson)}</div>
                                <div className="teacher">
                                    <div className="name name-min">{lesson.teacher.abb_name}</div>
                                </div>
                            </div>
                            <div className="head-card head-card-second head-card-min">
                                <div className="name">{getSubjectName(subLesson)}</div>
                                <div className="teacher">
                                    <div className="name name-min">{subLesson.exhibitor}</div>
                                </div>
                            </div>
                        </div>
                        <div className="cont">
                            <div className="cab">
                                <div className="flag-icon"></div>
                                {lesson.cabinet ? lesson.cabinet.number : null}
                            </div>
                            <div className="time">00:00</div>
                            <div className="cab">
                                <div className="flag-icon"></div>
                                {subLesson.cabinet ? subLesson.cabinet.number : null}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="item active">
                    <div className="num-lesson">{lesson.lessonNumber}</div>
                    <div className="couple">

                        <div className="head-card">
                            <div className="name">{getSubjectName(lesson)}</div>
                        </div>
                        <div className="cont">
                            <div className="teacher">
                                <div className="name">{lesson.exhibitor}</div>
                            </div>
                            <div className="min-cont">
                                <div className="cab">
                                    <div className="flag-icon"></div>
                                    {lesson.cabinet ? lesson.cabinet.number : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    if (props.mode === "day") {
        if (getSubjectName(lesson) === "Нет пары") {
            return (
                <div className="item">
                    <div className="num">{lesson.lessonNumber}</div>
                    <div className="couple one-couple no-lesson">
                        <div className="text">{getSubjectName(lesson)}</div>
                    </div>
                </div>
            );
        }
        if (props.subLesson !== null) {
            const {subLesson} = props;

            return (
                <div className="item">
                    <div className="num">{lesson.lessonNumber}</div>
                    <div className="couple">
                        <div className="sub-item">
                            <div className="head-card">
                                <div className="titles">
                                    <div className="name">{getSubjectName(lesson)}</div>
                                    <div className="teacher">
                                        {lesson.teacher.name === lesson.exhibitor
                                            ? lesson.teacher.name
                                            : lesson.exhibitor}
                                    </div>
                                </div>
                                <div className="cont">
                                    <div className="sign">{lesson.subgroup}</div>
                                    <div className="cab">
                                        {lesson.cabinet ? subLesson.cabinet.number : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sub-item">
                            <div className="head-card">
                                <div className="titles">
                                    <div className="name">{getSubjectName(subLesson)}</div>
                                    <div className="teacher">
                                        {subLesson.teacher.name === subLesson.exhibitor
                                            ? subLesson.teacher.name
                                            : subLesson.exhibitor}
                                    </div>
                                </div>
                                <div className="cont">
                                    <div className="sign">{subLesson.subgroup} </div>
                                    <div className="cab">
                                        {subLesson.cabinet ? subLesson.cabinet.number : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="item">
                    <div className="num">{lesson.lessonNumber}</div>
                    <div className="couple one-couple">
                        <div className="head-card">
                            <div className="titles">
                                <div className="name">{getSubjectName(lesson)}</div>
                                <div className="teacher">
                                    {lesson.teacher.name === lesson.exhibitor
                                        ? lesson.teacher.name
                                        : lesson.exhibitor}
                                </div>
                            </div>
                            <div className="cont">
                                {lesson.subgroup !== 0 ? (
                                    <div className="sign">{lesson.subgroup}</div>
                                ) : null}
                                <div className="cab">
                                    {lesson.cabinet ? lesson.cabinet.number : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
