import React from "react";
import Division from "./FilterParams/Division";
import FilterStore from "../../../../store/filterStore";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";


const GroupsFilter = () => {
    const {division, divisions} = FilterStore;


    return (
        <div className="items-list">
            <div className="column">
                {divisions.map((item) => (
                    <Link to={`/timetable/cabinet/${encodeURIComponent(item.name)}`}>
                        <Division
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
