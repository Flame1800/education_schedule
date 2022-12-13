import React from "react";
import FilterParam from "./FilterParams/FilterParam";
import FilterStore from "../../../../store/filterStore";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import scheduleStore from "../../../../store/scheduleStore";
import {Column, FilterItems} from "./FilterTabs.styled";


const GroupsFilter = () => {
    const {division, divisions} = FilterStore;
    const {weekMode} = scheduleStore;


    return (
        <FilterItems>
            <Column>
                {divisions.map((item) => (
                    <Link to={`/timetable/cabinet/${encodeURIComponent(item.name)}?week=${weekMode}`}>
                        <FilterParam
                            key={item._id}
                            item={item}
                            activeDivision={division}
                        />
                    </Link>
                ))}
            </Column>
        </FilterItems>
    );
};

export default observer(GroupsFilter);
