import React from "react";
import "./filter.scss";
import Switch from "./Switch/Switch";
import schedule from "../../../store/scheduleStore";
import {observer} from "mobx-react-lite";
import {DateTime} from "luxon";
import GroupsFilter from "./FillterTabs/GroupsFilter";
import TeachersFilter from "./FillterTabs/TeachersFilter";
import filterStore from "../../../store/filterStore";
import CabinetsFilter from "./FillterTabs/CabinetsFilter";

function Filter() {
    const currDate = DateTime.now().toISODate();
    const {mode} = filterStore;

    React.useEffect(() => {
        schedule.setLessons([])
        filterStore.setDivision('')
        filterStore.setCourse('')
    }, []);


    const filterScreens = {
        group: <GroupsFilter/>,
        teacher: <TeachersFilter/>,
        cabs: <CabinetsFilter/>
    }

    return (
        <div className="filter">
            <Switch/>
            {filterScreens[mode]}
            <div className="block-info">
                <div className="info">Расписание занятий на {currDate}</div>
            </div>
        </div>
    );
}

export default observer(Filter);
