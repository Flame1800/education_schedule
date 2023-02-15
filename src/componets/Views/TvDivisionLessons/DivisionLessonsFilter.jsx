import React, {useEffect} from 'react';
import FilterParam from "../Filter/FillterTabs/FilterParams/FilterParam";
import filterStore from "../../../store/filterStore";
import {Link} from "react-router-dom";
import "../Filter/filter.scss";
import {observer} from "mobx-react-lite";
import scheduleStore from "../../../store/scheduleStore";
import {BlockInfo, Date, FilterWrapper, ShowAllGroupsBtn} from "../Filter/Filter.style";
import {Column, FilterItems} from "../Filter/FillterTabs/FilterTabs.styled";
import {Skeleton} from "@mui/material";
import schedule from "../../../store/scheduleStore";
import {DateTime} from "luxon";
import styled from "styled-components";
import datesStore from "../../../store/datesStore";

const DivisionLessonsFilter = () => {
    const {loading, currWeek} = schedule
    const {setDay} = datesStore
    const currWeekView = DateTime.fromISO(currWeek?.dateStart).toISODate() ?? "..."

    useEffect(() => {
        setDay(DateTime.now().toISODate())
    }, [setDay])

    return (
        <FilterWrapper>
            <Title>Выберите корпус</Title>
            <FilterItems>
                <Column>
                    {filterStore.divisions.map((item) => {
                        return (
                            <Link
                                key={item._id}
                                to={`/timetable/divisions/${encodeURIComponent(item.name)}?week=${scheduleStore.weekMode}`}
                            >
                                <FilterParam item={item}/>
                            </Link>
                        )
                    })}
                </Column>
            </FilterItems>
            <BlockInfo>
                {loading ? <Skeleton width={250} height={30}/> :
                    <Date>Расписание занятий на <b>{currWeekView}</b></Date>}
                <Link to='/timetable'>
                    <ShowAllGroupsBtn>
                        Назад
                    </ShowAllGroupsBtn>
                </Link>
            </BlockInfo>
        </FilterWrapper>
    );
};

const Title = styled.div`
  margin-left: 30px;
  margin-top: 15px;
  font-size: 24px;
  color: #4b4b4b;
`

export default observer(DivisionLessonsFilter);