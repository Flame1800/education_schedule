import React from "react";
import Switch from "./Switch/Switch";
import schedule from "../../../store/scheduleStore";
import {observer} from "mobx-react-lite";
import GroupsFilter from "./FillterTabs/GroupsFilter";
import TeachersFilter from "./FillterTabs/TeachersFilter";
import filterStore from "../../../store/filterStore";
import CabinetsFilter from "./FillterTabs/CabinetsFilter";
import {BlockInfo, Date, FilterWrapper, ShowAllGroupsBtn} from "./Filter.style";
import {Link} from "react-router-dom";
import weekModeViews from "../../../consts/weekModeViews";
import styled from "styled-components";
import {Skeleton} from "@mui/material";
import SwitchWeekBtn from "./SwitchWeekBtn";

function Filter() {
    const {currWeek, weekMode, getCurrentWeek, loading} = schedule
    const {mode} = filterStore;


    React.useEffect(() => {
        getCurrentWeek()
        filterStore.getDivisions()
        filterStore.getGroups()
    }, [getCurrentWeek]);


    const filterScreens = {
        group: <GroupsFilter/>,
        teacher: <TeachersFilter/>,
        cabs: <CabinetsFilter/>
    }


    const loader = (<Loader>
        <Skeleton sx={{marginBottom: "15px"}} width={200} height={40}/>
        <Skeleton sx={{marginBottom: "15px"}} width={200} height={40}/>
        <Skeleton sx={{marginBottom: "15px"}} width={200} height={40}/>
        <Skeleton width={200} height={40}/>
    </Loader>)

    const fallBack = !loading ? (<Empty>На эту неделю нет пар</Empty>) : loader
    const weekIsCurr = weekMode === weekModeViews.curr

    return (
        <FilterWrapper>
            <Content>
                <div className="filters">
                    <FilterButtons>
                        <Switch/>
                        <Date mobile>Расписание занятий на <b>{weekIsCurr ? "текущую " : "следующую "} неделю</b></Date>
                        <PDFLink className="timetable-pdf-m" href="https://sielom.ru/schedule">Расписание в
                            PDF</PDFLink>
                        <SwitchWeekBtn/>
                    </FilterButtons>
                    {!currWeek ? fallBack : filterScreens[mode]}
                </div>
                <PDFLink className="timetable-pdf" href="https://sielom.ru/schedule">Расписание в PDF</PDFLink>
            </Content>
            <BlockInfo>
                <Date>Расписание занятий на <b>{weekIsCurr ? "текущую " : "следующую "} неделю</b></Date>
                <Flex>
                    <Link to='/timetable/divisions'>
                        <ShowAllGroupsBtn>
                            Все группы
                        </ShowAllGroupsBtn>
                    </Link>
                </Flex>
            </BlockInfo>
        </FilterWrapper>
    );
}

const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .timetable-pdf-m {
        display: none;
    }

    @media screen and (max-width: 768px) {
        flex-direction: column;
        justify-content: space-between;
        align-items: center;


        .timetable-pdf {
            display: none;
        }

        .timetable-pdf-m {
            display: flex;
            margin: 0 auto;
        }

        .filters {
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 0 20px;
            align-items: center;
        }
    }
`

const FilterButtons = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 40px;

    @media screen and (max-width: 768px) {
        flex-direction: column;
        margin-bottom: 10px;
    }
`

const PDFLink = styled.a`
    border-radius: 10px;
    background: #FFEBC0;
    width: 254px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: .2s;
    color: #4b4b4b;

    &:hover {
        background: #ffcc69;
    }
`

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
    align-items: center;
    flex-wrap: wrap;

    @media screen and (max-width: 768px) {
        display: none;
    }
`

const Loader = styled.div`
    margin: 20px;
`

export default observer(Filter);
