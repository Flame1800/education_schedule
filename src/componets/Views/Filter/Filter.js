import React from "react";
import Switch from "./Switch/Switch";
import schedule from "../../../store/scheduleStore";
import {observer} from "mobx-react-lite";
import {DateTime} from "luxon";
import GroupsFilter from "./FillterTabs/GroupsFilter";
import TeachersFilter from "./FillterTabs/TeachersFilter";
import filterStore from "../../../store/filterStore";
import CabinetsFilter from "./FillterTabs/CabinetsFilter";
import {BlockInfo, Date, FilterWrapper, ShowAllGroupsBtn} from "./Filter.style";
import {Link} from "react-router-dom";

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
        <FilterWrapper>
            <Switch/>
            {filterScreens[mode]}
            <BlockInfo>
                <Date>Расписание занятий на {currDate}</Date>
                <Link to='/timetable/divisions'>
                    <ShowAllGroupsBtn>
                        Все группы
                    </ShowAllGroupsBtn>
                </Link>
            </BlockInfo>
        </FilterWrapper>
    );
}

export default observer(Filter);
