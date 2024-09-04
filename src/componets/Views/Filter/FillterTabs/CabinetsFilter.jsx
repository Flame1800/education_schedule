import React from "react";
import FilterParam from "./FilterParams/FilterParam";
import FilterStore from "../../../../store/filterStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Column, FilterItems } from "./FilterTabs.styled";
import { weekStore } from "../../../../store";

const GroupsFilter = () => {
    const { division, divisions } = FilterStore;
    const { date } = weekStore;

    return (
        <FilterItems>
            <Column>
                {divisions.map((item) => (
                    <Link
                        key={item.name}
                        to={`/timetable/cabinet/${encodeURIComponent(
                            item.name
                        )}?week=${date.toISODate()}`}
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
