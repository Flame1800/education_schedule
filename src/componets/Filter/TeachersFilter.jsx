import React from "react";
import Division from "./FilterParams/Division";
import FilterStore from "../../store/filterStore";
import {divisions} from "../../assets/filterParamsData";
import ScheduleStore from "../../store/scheduleStore";
import _ from "lodash";
import {observer} from "mobx-react-lite";
import backImg from "../../assets/img/arrow-left.png";

const TeachersFilter = () => {
    const [teachers, setTeachers] = React.useState([]);
    const {division, setDivision, getTeachers} = FilterStore;
    const {setLessonsByTeacher} = ScheduleStore;

    const changeDivisionHandle = (division) => {
        setDivision(division);
        setTeachers(getTeachers());
    };

    const divisionComponents = (
        <div className="column">
            {divisions.map((item) => (
                <Division
                    item={item}
                    key={item}
                    activeDivision={division}
                    onClick={changeDivisionHandle}
                />
            ))}
        </div>
    );

    const teacherComponents = (
        <div className="teacher-groups column">
            <img
                src={backImg}
                alt="назад"
                className="arrow-left"
                onClick={() => setDivision(null)}
            />
            {teachers.map((teacher) => {
                return (
                    <div
                        className={"item item-teacher"}
                        key={_.uniqueId()}
                        onClick={() => setLessonsByTeacher(teacher)}
                    >
                        {teacher}
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="items-list">
            {divisionComponents}
            {division && (
                <>
                    {teachers.length === 0
                        ? "Преподаватели не найдены"
                        : teacherComponents}
                </>
            )}
        </div>
    );
};

export default observer(TeachersFilter);
