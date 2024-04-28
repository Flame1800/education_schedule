/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import FilterParam from "../Filter/FillterTabs/FilterParams/FilterParam";
import filterStore from "../../../store/filterStore";
import { Link } from "react-router-dom";
import "../Filter/filter.scss";
import { observer } from "mobx-react-lite";
import scheduleStore from "../../../store/scheduleStore";
import { BlockInfo, Date, FilterWrapper, ShowAllGroupsBtn } from "../Filter/Filter.style";
import { Column, FilterItems } from "../Filter/FillterTabs/FilterTabs.styled";
import { Skeleton } from "@mui/material";
import schedule from "../../../store/scheduleStore";
import { DateTime } from "luxon";
import styled from "styled-components";
import datesStore from "../../../store/datesStore";
import { beautyDate } from '../../../lib/beautyDate';

const DivisionLessonsFilter = () => {
  const { loading } = schedule
  const { setDay } = datesStore

  useEffect(() => {
    setDay(DateTime.now().toISODate())
  }, [setDay])

  const renderBackButton = () => (
    <Link to='/timetable'>
      <ShowAllGroupsBtn>
        Назад
      </ShowAllGroupsBtn>
    </Link>
  )

  const renderDate = () => (<Date>Расписание занятий на <b>{beautyDate()}</b></Date>)

  return (
    <FilterWrapper>
      <div>
        <Title>Выберите корпус</Title>
        <FilterItems>
          <Column>
            {filterStore.divisions.map((item) => {
              return (
                <Link
                  key={item._id}
                  to={`/timetable/divisions/${encodeURIComponent(item.name)}?week=curr`}
                >
                  <FilterParam item={item} />
                </Link>
              )
            })}
          </Column>
        </FilterItems>
      </div>
      <BlockInfo>
        {loading ? <Skeleton width={250} height={30} /> : renderDate()}

        {renderBackButton()}
      </BlockInfo>
    </FilterWrapper>
  );
};

const Title = styled.div`
    font-size: 24px;
    color: #4b4b4b;
`

export default observer(DivisionLessonsFilter);
