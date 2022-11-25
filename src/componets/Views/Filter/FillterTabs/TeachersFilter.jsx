import React from "react";
import FilterParam from "./FilterParams/FilterParam";
import FilterStore from "../../../../store/filterStore";
import {observer} from "mobx-react-lite";
import backImg from "../../../../assets/img/arrow-left.png";
import {Link} from "react-router-dom";
import {BackIcon, Column, FilterItems, FilterParamWrapper, OverflowColumn} from "./FilterTabs.styled";

const TeachersFilter = () => {
    const [teachers, setTeachers] = React.useState([]);
    const {division, setDivision, getTeachers, divisions} = FilterStore;

    const changeDivisionHandle = async (item) => {
        setDivision(item);
        setTeachers(await getTeachers(item.name));
    };

    const divisionComponents = divisions.map((item) => (
        <FilterParam
            item={item}
            key={item._id}
            activeDivision={division}
            onClick={() => changeDivisionHandle(item)}
        />
    ))


    const teacherComponents = (
        <OverflowColumn>
            <BackIcon
                src={backImg}
                alt="назад"
                onClick={() => setDivision(null)}
            />
            {teachers.map((teacher) => {
                return (
                    <Link to={`/timetable/teacher/${teacher}`} key={teacher}>
                        <FilterParamWrapper>
                            {teacher}
                        </FilterParamWrapper>
                    </Link>
                );
            })}
        </OverflowColumn>
    );

    return (
        <FilterItems>
            <Column>
                {divisionComponents}
            </Column>
            {division && (teachers.length === 0 ? "Преподаватели не найдены" : teacherComponents)}
        </FilterItems>
    );
};

export default observer(TeachersFilter);
