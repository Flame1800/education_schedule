import React, {useEffect} from "react";
import FilterParam from "./FilterParams/FilterParam";
import Course from "./FilterParams/Course";
import FilterStore from "../../../../store/filterStore";
import {courses} from "../../../../assets/filterParamsData";
import {observer} from "mobx-react-lite";
import backImg from "../../../../assets/img/arrow-left.png";
import {Link} from "react-router-dom";
import {BackIcon, Column, FilterItems, FilterParamWrapper, OverflowColumn} from "./FilterTabs.styled";
import scheduleStore from "../../../../store/scheduleStore";


const deleteDuplicates = (array, key) => {
    let curr = array[0];
    const result = [];

    for (let i = 0; i < array.length; i++) {
        if (array[i][key] !== curr[key]) {
            result.push(array[i]);
            curr = array[i];
        }
    }

    return result;
}


const GroupsFilter = () => {
    const {division, course, setCourse, setDivision, divisions, groups} = FilterStore;
    const {weekMode} = scheduleStore

    // useEffect(() => {
    //     (async () => {
    //         const {data} = await getGroups()
    //         console.log(data.map(group => group.name).sort())
    //     })()
    // }, [])

    const changeDivisionHandle = (division) => {
        setDivision(division);
    };

    const findGroupsHandle = (course) => {
        setCourse(course);
    };

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
                <Link to={`/timetable/group/${group.id_1c}?week=${weekMode}`} key={group.id_1c}>
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
                        onClick={() => setDivision(null)}
                    />
                    {groupComponents.length ? groupComponents : "Группы не найдены"}
                </OverflowColumn>
            )}
        </FilterItems>
    );
};

export default observer(GroupsFilter);
