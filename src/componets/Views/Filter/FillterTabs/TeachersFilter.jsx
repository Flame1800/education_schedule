import React from "react";
import Division from "./FilterParams/Division";
import FilterStore from "../../../../store/filterStore";
import {observer} from "mobx-react-lite";
import backImg from "../../../../assets/img/arrow-left.png";
import {Link} from "react-router-dom";

const TeachersFilter = () => {
    const [teachers, setTeachers] = React.useState([]);
    const {division, setDivision, getTeachers, divisions} = FilterStore;

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
                    <Link to={`/timetable/teacher/${teacher}`} key={teacher}>
                        <div className={"item item-teacher"}>
                            {teacher}
                        </div>
                    </Link>
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
