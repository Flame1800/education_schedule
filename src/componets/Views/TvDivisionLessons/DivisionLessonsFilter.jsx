import React from 'react';
import Division from "../Filter/FillterTabs/FilterParams/Division";
import filterStore from "../../../store/filterStore";
import {Link} from "react-router-dom";
import "../Filter/filter.scss";
import {observer} from "mobx-react-lite";

const DivisionLessonsFilter = () => {

    return (
        <div className='filter'>
            <div className="items-list">
                <div className="column">
                    {filterStore.divisions.map((item) => {
                        return (
                            <Link key={item._id} to={`/timetable/tv/${encodeURIComponent(item.name)}`}>
                                <Division item={item}/>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default observer(DivisionLessonsFilter);