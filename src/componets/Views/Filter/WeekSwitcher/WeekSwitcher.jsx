import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { DateTime } from "luxon";
import {
    ArrowLongLeftIcon,
    ArrowLongRightIcon,
} from "@heroicons/react/24/solid";
import datesStore from "../../../../store/datesStore";
import { getWeek } from "../../../../lib/API";
import weekStore from "../../../../store/weekStore";
import Loader from "../../../Loader/Loader";
import { formatDate } from "../../../../lib/FormatDate";

const WeekSwitcher = () => {
    const { setDay } = datesStore;
    const { date: weekDate, setDate, setWeek } = weekStore;
    const [dateStartEnd, setDateStartEnd] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // #region setting week dates
    useEffect(() => {

        (async () => {
            try {
                setIsLoading(true);
    const settingCurrentStates = async () => {
        try {
            setIsLoading(true);

                const week = await getWeek(weekDate);

                setWeek(week);
                setDay(weekDate.toISODate());

                const dateString =
                    formatDate(week?.dateStart ?? "") +
                    " - " +
                    formatDate(week?.dateEnd ?? "");

                setDateStartEnd(
                    dateString.length > 3
                        ? dateString
                        : weekDate.toFormat("dd.MM.yyyy")
                );
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [weekDate, setDay, setWeek]);
    // #endregion

    function decrementWeek() {
        const currDate = weekDate;
        const newDate = DateTime.fromISO(currDate).minus({ week: 1 });

        setDate(newDate);
    }

    function incrementWeek() {
        const currDate = weekDate;
        const newDate = DateTime.fromISO(currDate).plus({ week: 1 });

        setDate(newDate);
    }

    return (
        <>
            {isLoading && <Loader />}
            {!isLoading && (
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
            )}
        </>
    );
};

export default observer(WeekSwitcher);
