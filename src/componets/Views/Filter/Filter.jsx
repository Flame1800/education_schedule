import React, { useEffect, useState } from "react";
import Switch from "./Switch/Switch";
import { observer } from "mobx-react-lite";
import GroupsFilter from "./FillterTabs/GroupsFilter";
import TeachersFilter from "./FillterTabs/TeachersFilter";
import filterStore from "../../../store/filterStore";
import CabinetsFilter from "./FillterTabs/CabinetsFilter";
import {
    BlockInfo,
    FilterWrapper,
    ShowAllGroupsBtn,
} from "./Filter.style";
import { Link } from "react-router-dom";
import styled from "styled-components";
import WeekSwitcher from "./WeekSwitcher/WeekSwitcher";
import weekStore from "../../../store/weekStore";
import CircularLoader from "../../CircularLoader/CircularLoader";

function Filter() {
    const { week } = weekStore;
    const { mode, getDivisions, getGroups } = filterStore;
    const [isLoading, setIsLoading] = useState(false);

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
        <LoaderWrapper>
            <CircularLoader className="h-24" />
        </LoaderWrapper>
    );

    const fallBack = !isLoading ? <Empty>На эту неделю нет пар</Empty> : loader;

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

const LoaderWrapper = styled.div`
    height: 100%;
    display: flex;

    @media screen and (max-width: 768px) {
        position: relative;
        width: 100%;
        flex-direction: column;
        height: calc(100% - 55px);
    }
`;

export default observer(Filter);
