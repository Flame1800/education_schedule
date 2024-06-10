import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import scheduleStore from "../../../../store/scheduleStore";
import { DateTime } from "luxon";
import {
    ArrowLongLeftIcon,
    ArrowLongRightIcon,
} from "@heroicons/react/24/solid";
import datesStore from "../../../../store/datesStore";

const WeekSwitcher = () => {
    const { setCurrentWeek, changeDate, getDate, getCurrentWeek } =
        scheduleStore;
    const { setDay, currDay } = datesStore;
    const [dateStartEnd, setDateStartEnd] = useState("");

    // #region setting week dates
    useEffect(() => {
        const formatDate = (dateISO) =>
            DateTime.fromISO(dateISO).toFormat("dd.MM.yyyy");

        (async () => {
            try {
                await setCurrentWeek();
                const week = getCurrentWeek();
                // console.log(week)

                // console.log("before " + currDay)
                // setDay(currDate.toISODate());
                // console.log("after " + currDay)

                setDateStartEnd(
                    formatDate(week?.dateStart ?? currDay) +
                        " - " +
                        formatDate(week?.dateEnd ?? currDay)
                );
            } catch (e) {
                console.error(e);
            }
        })();
    }, [getDate()]);
    // #endregion

    function decrementWeek() {
        const currDate  = getDate();

        const newDate = DateTime.fromISO(currDate)
            .minus({ week: 1 })
            .toISODate();

        changeDate(newDate);
    }

    function incrementWeek() {
        const currDate  = getDate();

        const newDate = DateTime.fromISO(currDate)
            .plus({ week: 1 })
            .toISODate();

        changeDate(newDate);
    }

    return (
        <div className="flex flex-row items-center justify-center space-x-3 py-1 px-1 h-11 flex-shrink-0">
            {/* arrow to left */}
            <div
                className="flex flex-row justify-center items-center rounded-[30px] borde-none cursor-pointer h-[99%] px-[10px] py-[3px]"
                onClick={() => decrementWeek()}
            >
                <ArrowLongLeftIcon className="w-8 text-gray-500" />
            </div>

            <div className="flex flex-col items-center">
                <p className="text-xs">Неделя</p>
                <p>{dateStartEnd}</p>
            </div>

            {/* arrow to right */}
            <div
                className="flex flex-row justify-center items-center rounded-[30px] borde-none cursor-pointer h-[99%] px-[10px] py-[3px]"
                onClick={() => incrementWeek()}
            >
                <ArrowLongRightIcon className="w-8 text-gray-500" />
            </div>
        </div>
    );
};

export default observer(WeekSwitcher);
