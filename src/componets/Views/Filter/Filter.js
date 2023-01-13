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
import weekModeViews from "../../../consts/weekModeViews";
import styled from "styled-components";
import {Skeleton} from "@mui/material";
import {isMobile} from "react-device-detect";

function Filter() {
    const {currWeek, currDate, weekMode, changeWeek, getCurrentWeek, loading} = schedule
    const {mode} = filterStore;


    const currWeekView = currDate ?? "..."

    React.useEffect(() => {
        getCurrentWeek()
        filterStore.getDivisions()
        filterStore.getGroups()
    }, []);

    const changeWeekHandle = () => {
        (async () => {
            const mode = weekMode === weekModeViews.next ? weekModeViews.curr : weekModeViews.next
            changeWeek(mode)
            await getCurrentWeek()
        })()
    }


    const filterScreens = {
        group: <GroupsFilter/>,
        teacher: <TeachersFilter/>,
        cabs: <CabinetsFilter/>
    }


    const loader = (<Loader>
        <Skeleton sx={{marginBottom: '15px'}} width={200} height={40}/>
        <Skeleton sx={{marginBottom: '15px'}} width={200} height={40}/>
        <Skeleton sx={{marginBottom: '15px'}} width={200} height={40}/>
        <Skeleton width={200} height={40}/>
    </Loader>)

    const fallBack = !loading ? (<Empty>На эту неделю нет пар</Empty>) : loader

    return (
        <FilterWrapper>
            <Switch/>
            {!currWeek ? fallBack : filterScreens[mode]}
            <BlockInfo>
                {loading ? <Skeleton width={250} height={30}/> :
                    <Date>Расписание занятий на <b>{currWeekView}</b></Date>}
                <Flex>
                    <ShowAllGroupsBtn
                        active={weekModeViews.next === weekMode}
                        onClick={changeWeekHandle}
                    >
                        {weekMode === weekModeViews.curr ? "Следующая неделя" : "Текущая неделя"}
                    </ShowAllGroupsBtn>
                    {!isMobile && <Link to='/timetable/divisions'>
                        <ShowAllGroupsBtn>
                            Все группы
                        </ShowAllGroupsBtn>
                    </Link>}
                </Flex>
            </BlockInfo>
        </FilterWrapper>
    );
}

const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  font-size: 24px;
  font-weight: 600;
  color: #7c7c7c;
`

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Loader = styled.div`
  margin: 20px;
`

export default observer(Filter);
