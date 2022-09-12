import React from "react";
import "./filter.scss";
import Switch from "./Switch/Switch";
import Search from "./Search/Search";
import schedule from "../../store/scheduleStore";
import {observer} from "mobx-react-lite";
import {DateTime} from "luxon";
import GroupsFilter from "./GroupsFilter";
import TeachersFilter from "./TeachersFilter";
import filterStore from "../../store/filterStore";
import AllGroupsFilter from "./AllGroupsFilter";
import {Route, Link} from "react-router-dom";

function Filter() {
    const currDate = DateTime.now().toISODate();
    const {mode, setMode} = filterStore;

    React.useEffect(() => {
        filterStore.setData(schedule.allLessons);
        filterStore.setDivision('')
        filterStore.setCourse('')
    }, []);

    const head = (
        <div className="header">
            <Switch/>
            <Search/>
        </div>
    );

    const info = (
        <div className="block-info">
            <div className="info">Расписание занятий на {currDate}</div>
            <div className="all-groups-btn" onClick={() => setMode('allGroups')}>
                Все группы
            </div>
        </div>
    );

    return (
        <div className="filter">
            {mode !== 'allGroups' && head}
            {mode === "group" && <GroupsFilter/>}
            {mode === "teacher" && <TeachersFilter/>}
            {mode === 'allGroups' && <AllGroupsFilter/>}
            {info}
        </div>
    );
}

export default observer(Filter);
