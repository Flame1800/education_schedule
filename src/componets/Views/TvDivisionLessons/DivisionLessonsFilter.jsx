/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import FilterParam from "../Filter/FillterTabs/FilterParams/FilterParam";
import { Link } from "react-router-dom";
import "../Filter/filter.scss";
import { observer } from "mobx-react-lite";
import {
    BlockInfo,
    Date,
    FilterWrapper,
    ShowAllGroupsBtn,
} from "../Filter/Filter.style";
import { Column, FilterItems } from "../Filter/FillterTabs/FilterTabs.styled";
import { DateTime } from "luxon";
import styled from "styled-components";
import { beautyDate } from "../../../lib/beautyDate";
import {
    datesStore,
    filterStore,
    scheduleStore,
    weekStore,
} from "../../../store";
import CircleLoader from "../../CircularLoader/CircularLoader";
import Skeleton from "react-loading-skeleton";

const DivisionLessonsFilter = () => {
    const [loading, setLoading] = useState(false);
    const { setDay } = datesStore;
    const { divisions, getDivisions } = filterStore;
    const { week } = weekStore;

    useEffect(() => {
        setDay(DateTime.now().toISODate());
    }, [setDay]);

    useEffect(() => {
        (async () => {
            setLoading(true);

            await getDivisions().finally(() => {
                setLoading(false);
            });
        })();
    }, [week, getDivisions]);

    const renderBackButton = () => (
        <Link to="/timetable">
            <ShowAllGroupsBtn>Назад</ShowAllGroupsBtn>
        </Link>
    );

    const renderDate = () => (
        <Date>
            Расписание занятий на <b>{beautyDate()}</b>
        </Date>
    );

    const dateLoader = (
        <Date>
            <Skeleton width={"10rem"} />
        </Date>
    );

    const filterItemsLoader = (
        <FilterItems>
            <Column>
                <CircleLoader className="h-24" />
            </Column>
        </FilterItems>
    );

    return (
        <FilterWrapper>
            <div>
                <Title>Выберите корпус</Title>
                {loading ? (
                    filterItemsLoader
                ) : (
                    <FilterItems>
                        <Column>
                            {divisions.map((item) => {
                                return (
                                    <Link
                                        key={item._id}
                                        to={`/timetable/divisions/${encodeURIComponent(
                                            item.name
                                        )}?week=curr`}
                                    >
                                        <FilterParam item={item} />
                                    </Link>
                                );
                            })}
                        </Column>
                    </FilterItems>
                )}
            </div>
            <BlockInfo>
                {/* TODO: сделать лоадер */}
                {loading ? dateLoader : renderDate()}

                {renderBackButton()}
            </BlockInfo>
        </FilterWrapper>
    );
};

const Title = styled.div`
    font-size: 24px;
    color: #4b4b4b;
`;

export default observer(DivisionLessonsFilter);
