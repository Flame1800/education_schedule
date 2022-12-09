import React from "react";
import "./nawWeek.scss";
import {observer} from "mobx-react-lite";
import datesStore from "../../store/datesStore";
import _ from "lodash";
import './nawWeek.scss'
import {Day, NawWeekWrapper, Num, WeekDayItem} from "./NawWeek.style";

function NavWeek() {
    const {datesWeek, currDay, setDay} = datesStore

    React.useEffect(() => {
        datesStore.getDatesWeek()
    }, [])

    const selectDayHandle = (day) => {
        setDay(day.toISODate())
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
                        <Num>{date.toFormat('dd LLL')}</Num>
                        <Day>{date.weekdayShort}</Day>
                    </WeekDayItem>
                );
            })}
        </NawWeekWrapper>
    );
}

export default observer(NavWeek);
