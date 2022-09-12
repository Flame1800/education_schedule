import React from 'react';
import Division from "./FilterParams/Division";
import {divisions} from "../../assets/filterParamsData";
import scheduleStore from "../../store/scheduleStore";

const AllGroupsFilter = () => {

    const selectDivisionHandle = (division) => {
        scheduleStore.setLessonsByDivison(division)
    }

    const divisionComponents = (
        <div className="column">
            {divisions.map((item) => (
                <Division
                    key={item}
                    item={item}
                    onClick={selectDivisionHandle}
                />
            ))}
        </div>
    );

    return (
        <div className="items-list">
            {divisionComponents}
        </div>
    );
};

export default AllGroupsFilter;