import React from "react";
import FilterParam from "./FilterParams/FilterParam";
import FilterStore from "../../../../store/filterStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import scheduleStore from "../../../../store/scheduleStore";
import { Column, FilterItems } from "./FilterTabs.styled";

const GroupsFilter = () => {
    const { division, divisions } = FilterStore;
    const { getDate } = scheduleStore;

    const currentDate = getDate();

    return (
        <FilterItems>
            <Column>
                {divisions.map((item) => (
                    <Link
                        key={item.name}
                        to={`/timetable/cabinet/${encodeURIComponent(
                            item.name
                        )}?week=${currentDate}`}
                    >
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
