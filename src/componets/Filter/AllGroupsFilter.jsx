import React from 'react';
import Division from "./FilterParams/Division";
import filterStore from "../../store/filterStore";
import scheduleStore from "../../store/scheduleStore";

const AllGroupsFilter = () => {

    const selectDivisionHandle = (division) => {
        scheduleStore.setLessonsByDivison(division.name)
    }

    return (
        <div className="items-list">
            <div className="column">
                {filterStore.divisions.map((item) => (
                    <Division
                        key={item._id}
                        item={item}
                        onClick={() => selectDivisionHandle(item)}
                    />
                ))}
            </div>
        </div>
    );
};

export default AllGroupsFilter;