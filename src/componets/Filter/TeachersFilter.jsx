import React from "react";
import Division from "./FilterParams/Division";
import FilterStore from "../../store/filterStore";
import ScheduleStore from "../../store/scheduleStore";
import {observer} from "mobx-react-lite";
import backImg from "../../assets/img/arrow-left.png";

const TeachersFilter = () => {
    const [teachers, setTeachers] = React.useState([]);
    const {division, setDivision, getTeachers, divisions} = FilterStore;
    const {setLessonsByTeacher} = ScheduleStore;


    const changeDivisionHandle = async (item) => {
        setDivision(item);
        setTeachers(await getTeachers(item.name));
    };

    const divisionComponents = (
        <div className="column">
            {divisions.map((item) => (
                <Division
                    item={item}
                    key={item._id}
                    activeDivision={division}
                    onClick={() => changeDivisionHandle(item)}
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
                        key={teacher}
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
