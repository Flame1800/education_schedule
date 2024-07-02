import React, { useEffect, useState } from "react";
import Switch from "./Switch/Switch";
import { observer } from "mobx-react-lite";
import GroupsFilter from "./FillterTabs/GroupsFilter";
import TeachersFilter from "./FillterTabs/TeachersFilter";
import filterStore from "../../../store/filterStore";
import CabinetsFilter from "./FillterTabs/CabinetsFilter";
import {
    BlockInfo,
    Date,
    FilterWrapper,
    ShowAllGroupsBtn,
} from "./Filter.style";
import { Link } from "react-router-dom";
import styled from "styled-components";
import WeekSwitcher from "./WeekSwitcher/WeekSwitcher";
import weekStore from "../../../store/weekStore";
import { DateTime } from "luxon";
import { getWeek } from "../../../lib/API";
import { formatDate } from "../../../lib/FormatDate";

function Filter() {
    const { week, date: weekDate } = weekStore;
    const { mode, getDivisions, getGroups } = filterStore;
    const [isLoading, setIsLoading] = useState(false);

    const [weekDates, setWeekDates] = useState("");

    useEffect(() => {
        getDivisions();
        getGroups();
    }, [week, getGroups, getDivisions]);

    const filterScreens = {
        group: <GroupsFilter />,
        teacher: <TeachersFilter />,
        cabs: <CabinetsFilter />,
    };

    const loader = (
        <Loader>
            {/* TODO: сделать лоадер */}
        </Loader>
    );

    const fallBack = !isLoading ? <Empty>На эту неделю нет пар</Empty> : loader;



    const gettingWeekAndSettingWeekDates = async () => {
        try {
            const week = await getWeek(weekDate);

            const dateString =
                formatDate(week?.dateStart ?? "") +
                " - " +
                formatDate(week?.dateEnd ?? "");

            setWeekDates(
                dateString.length > 3
                    ? dateString
                    : weekDate.toFormat("dd.MM.yyyy")
            );
        } catch (e) {
            console.error(e);
        }
    }

    // #region setting week dates
    useEffect(() => {
        gettingWeekAndSettingWeekDates();
    }, [weekDate]);
    // #endregion

    return (
        <FilterWrapper>
            {/* header */}
            <Content>

                <div className="filters">
                    {/* Группа | Преподаватель | Кабинеты */}
                    <FilterButtons>
                        <Switch />

                        <WeekSwitcher />

                        <PDFLink
                            className="timetable-pdf-m"
                            href="https://sielom.ru/schedule"
                        >
                            Расписание в PDF
                        </PDFLink>
                    </FilterButtons>

                    {/* choosing division */}
                    {!week ? fallBack : filterScreens[mode]}
                </div>


                {/* расписание в PDF */}
                <PDFLink
                    className="timetable-pdf"
                    href="https://sielom.ru/schedule"
                >
                    Расписание в PDF
                </PDFLink>
            </Content>

            {/* footer */}
            <BlockInfo>
                <Flex>
                    <Link to="/timetable/divisions">
                        <ShowAllGroupsBtn>Все группы</ShowAllGroupsBtn>
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
`;

const FilterButtons = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 40px;

    @media screen and (max-width: 768px) {
        flex-direction: column;
        margin-bottom: 10px;
    }
`;

const PDFLink = styled.a`
    border-radius: 10px;
    background: #ffebc0;
    width: 254px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s;
    color: #4b4b4b;

    &:hover {
        background: #ffcc69;
    }
`;

const Empty = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 400px;
    font-size: 24px;
    font-weight: 600;
    color: #7c7c7c;
`;

const Flex = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

const Loader = styled.div`
    margin: 20px;
`;

export default observer(Filter);
