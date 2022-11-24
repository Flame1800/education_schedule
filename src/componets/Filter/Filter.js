import React from "react";
import "./filter.scss";
import Switch from "./Switch/Switch";
import schedule from "../../store/scheduleStore";
import {observer} from "mobx-react-lite";
import {DateTime} from "luxon";
import GroupsFilter from "./FillterTabs/GroupsFilter";
import TeachersFilter from "./FillterTabs/TeachersFilter";
import filterStore from "../../store/filterStore";
import CabinetsFilter from "./FillterTabs/CabinetsFilter";

function Filter() {
    const currDate = DateTime.now().toISODate();
    const {mode} = filterStore;

    React.useEffect(() => {
        filterStore.setData(schedule.allLessons);
        filterStore.setDivision('')
        filterStore.setCourse('')
    }, []);


    const info = (
        <div className="block-info">
            <div className="info">Расписание занятий на {currDate}</div>
        </div>
    );

    const filterScreens = {
        group: <GroupsFilter/>,
        teacher: <TeachersFilter/>,
        cabs: <CabinetsFilter/>
    }

    return (
        <div className="filter">
            <div className="header">
                <Switch/>
                {/*<Search/>*/}
            </div>
            {filterScreens[mode]}
        </div>
    );
}

export default observer(Filter);
