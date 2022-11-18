import React from "react";
import Division from "./FilterParams/Division";
import Course from "./FilterParams/Course";
import FilterStore from "../../store/filterStore";
import {courses} from "../../assets/filterParamsData";
import schedule from "../../store/scheduleStore";
import {observer} from "mobx-react-lite";
import backImg from "../../assets/img/arrow-left.png";
import {toJS} from "mobx";
import _ from "lodash"


const GroupsFilter = () => {
    const {division, course, setCourse, setDivision, divisions, groups} = FilterStore;
    const {setLessonsByGroup} = schedule;

    const changeDivisionHandle = (division) => {
        setCourse(null);
        setDivision(division);
    };

    const findGroupsHandle = (course) => {
        setCourse(course);
    };

    const divisionComponents = divisions.map((item) => (
        <Division
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


    const groupComponents = groups ? groups
        .filter(group => group.course === course && group.divisionId === division?.id_1c)
        .map((group) => {
            return (
                <div className={"item"} key={group._id} onClick={() => setLessonsByGroup(group.id_1c)}>
                    {group.name}
                </div>
            );
        }) : null;

    return (
        <div className="items-list">
            <div className="column">
                {divisionComponents}
            </div>
            <div className="column">
                {division && courseComponents}
            </div>
            {division && course && (
                <div className="column groups">
                    <img
                        src={backImg}
                        alt="назад"
                        className="arrow-left"
                        onClick={() => setDivision(null)}
                    />
                    {groups.length === 0 ? "Группы не найдены" : groupComponents}
                </div>
            )}
        </div>
    );
};

export default observer(GroupsFilter);
