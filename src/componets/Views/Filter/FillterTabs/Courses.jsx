import React from 'react';
import {Column} from "./FilterTabs.styled";
import {courses} from "../../../../assets/filterParamsData";
import Course from "./FilterParams/Course";
import FilterStore from "../../../../store/filterStore";

const Courses = () => {
    const {course, setCourse} = FilterStore;

    const findGroupsHandle = (course) => {
        setCourse(course);
    };

    return (
        <Column>
            {courses.map((item) => (
                <Course
                    key={item}
                    item={item}
                    activeCourse={course}
                    onClick={() => findGroupsHandle(item)}
                />
            ))}
        </Column>
    );
};

export default Courses;