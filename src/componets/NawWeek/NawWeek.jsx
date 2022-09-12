import React from "react";
import "./nawWeek.scss";
import {observer} from "mobx-react-lite";
import datesStore from "../../store/datesStore";
import _ from "lodash";
import './nawWeek.scss'

function NavWeek() {
    const {datesWeek, currDay, setDay} = datesStore

    React.useEffect(() => {
        datesStore.getDatesWeek()
    }, [])

    const selectDayHandle = (day) => {
        setDay(day.toISODate())
    };


    return (
        <div className="nav-week d-flex">
            {datesWeek.map((date) => {
                let classes = "item";

                if (date.toISODate() === currDay) {
                    classes += " item-active";
                }

                return (
                    <div
                        className={classes}
                        key={_.uniqueId()}
                        onClick={() => selectDayHandle(date)}
                    >
                        <div className="num">{date.toFormat('dd LLL')}</div>
                        <div className="day">{date.weekdayShort}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default observer(NavWeek);
