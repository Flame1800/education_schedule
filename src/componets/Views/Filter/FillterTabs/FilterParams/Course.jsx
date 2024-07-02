import React from "react";
import {FilterParamWrapper} from "../FilterTabs.styled";

const Course = ({item, activeCourse, onClick}) => {
    return (
        <FilterParamWrapper active={item === activeCourse} onClick={() => onClick(item)}>
            {item} Курс
        </FilterParamWrapper>
    );
};

export default Course;
