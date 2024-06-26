import React from "react";
import FilterParam from "./FilterParams/FilterParam";
import Course from "./FilterParams/Course";
import FilterStore from "../../../../store/filterStore";
import {courses} from "../../../../assets/filterParamsData";
import {observer} from "mobx-react-lite";
import backImg from "../../../../assets/img/arrow-left.png";
import {Link} from "react-router-dom";
import {BackIcon, Column, FilterItems, FilterParamWrapper, OverflowColumn} from "./FilterTabs.styled";
import weekStore from "../../../../store/weekStore";


const GroupsFilter = () => {
    const {division, course, setCourse, setDivision, divisions, groups} = FilterStore;
    const {date: weekDate} = weekStore;

    const changeDivisionHandle = (division) => {
        setDivision(division);
    };

    const findGroupsHandle = (course) => {
        setCourse(course);
    };

    const clearOldFilters = () => {
        setDivision(null)
        setCourse(null)
    }

    const divisionComponents = divisions.map((item) => (
        <FilterParam
            key={item._id}
            item={item}
            activeDivision={division}
            onClick={changeDivisionHandle}
        />
    ))

    const courseComponents = courses.map((item) => (
        <Course
            key={item}
            item={item}
            activeCourse={course}
            onClick={() => findGroupsHandle(item)}
        />
    ))



    const groupComponents = groups
        .filter(group => group.course === course && group.divisionId === division?.id_1c)
        .map((group) => {
            return (
                <Link to={`/timetable/group/${group.id_1c}?week=${weekDate.toISODate()}`} key={group.id_1c}>
                    <FilterParamWrapper>{group.name}</FilterParamWrapper>
                </Link>
            );
        });


    return (
        <FilterItems>
            <Column>
                {divisionComponents}
            </Column>
            <Column>
                {division && courseComponents}
            </Column>
            {division && course && (
                <OverflowColumn>
                    <BackIcon
                        src={backImg}
                        alt="назад"
                        onClick={clearOldFilters}
                    />
                    {groupComponents.length ? groupComponents : "Группы не найдены"}
                </OverflowColumn>
            )}
        </FilterItems>
    );
};

export default observer(GroupsFilter);
