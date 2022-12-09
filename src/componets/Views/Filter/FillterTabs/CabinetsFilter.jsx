import React from "react";
import FilterParam from "./FilterParams/FilterParam";
import FilterStore from "../../../../store/filterStore";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import scheduleStore from "../../../../store/scheduleStore";


const GroupsFilter = () => {
    const {division, divisions} = FilterStore;
    const {weekMode} = scheduleStore;


    return (
        <div className="items-list">
            <div className="column">
                {divisions.map((item) => (
                    <Link to={`/timetable/cabinet/${encodeURIComponent(item.name)}?week=${weekMode}`}>
                        <FilterParam
                            key={item._id}
                            item={item}
                            activeDivision={division}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default observer(GroupsFilter);
