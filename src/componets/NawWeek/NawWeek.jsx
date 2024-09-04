import React, { useEffect } from "react";
import "./nawWeek.scss";
import { observer } from "mobx-react-lite";
import datesStore from "../../store/datesStore";
import _ from "lodash";
import "./nawWeek.scss";
import { Day, NawWeekWrapper, Num, WeekDayItem } from "./NawWeek.style";
import { useQueryParam } from "use-query-params";

function NavWeek() {
    const { datesWeek, getDatesWeek, currDay, setDay } = datesStore;
    const [week, setWeek] = useQueryParam('week');

    useEffect(() => {
        getDatesWeek();
    }, []);

    const selectDayHandle = (day) => {
        setWeek(day.toISODate());
        setDay(day.toISODate());
    };

    return (
        <NawWeekWrapper>
            {datesWeek.map((date) => {
                return (
                    <WeekDayItem
                        active={date.toISODate() === currDay}
                        key={_.uniqueId()}
                        onClick={() => selectDayHandle(date)}
                    >
                        <Num>{date.toFormat("dd LLL")}</Num>
                        <Day>{date.weekdayShort}</Day>
                    </WeekDayItem>
                );
            })}
        </NawWeekWrapper>
    );
}

export default observer(NavWeek);
