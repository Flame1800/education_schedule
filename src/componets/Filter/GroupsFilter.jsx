import React from "react";
import Division from "./FilterParams/Division";
import Course from "./FilterParams/Course";
import FilterStore from "../../store/filterStore";
import {divisions, courses} from "../../assets/filterParamsData";
import schedule from "../../store/scheduleStore";
import _ from "lodash";
import {observer} from "mobx-react-lite";
import backImg from "../../assets/img/arrow-left.png";

const GroupsFilter = () => {
    const [groups, setGroups] = React.useState([]);
    const {division, course, setCourse, setDivision, getGroups} = FilterStore;
    const {setLessonsByGroup} = schedule;

    const changeDivisionHandle = (division) => {
        setCourse(null);
        setDivision(division);
    };

    const findGroupsHandle = (course) => {
        setCourse(course);
        setGroups(getGroups(division, course));
    };

    const divisionComponents = (
        <div className="column">
            {divisions.map((item) => (
                <Division
                    key={item}
                    item={item}
                    activeDivision={division}
                    onClick={changeDivisionHandle}
                />
            ))}
        </div>
    );

    const courseComponents = (
        <div className="column">
            {courses.map((item) => (
                <Course
                    key={item}
                    item={item}
                    activeCourse={course}
                    onClick={() => findGroupsHandle(item)}
                />
            ))}
        </div>
    );

    const groupComponents = groups.map((group) => {
        return (
            <div
                className={"item"}
                key={_.uniqueId()}
                onClick={() => setLessonsByGroup(group)}
            >
                {group}
            </div>
        );
    });

    return (
        <div className="items-list">
            {divisionComponents}
            {division && courseComponents}
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
