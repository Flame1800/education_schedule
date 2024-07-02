import { makeAutoObservable } from "mobx";
import { DateTime } from "luxon";
import { getWeek } from "../lib/API";
import weekStore from "./weekStore";

class DatesStore {
    datesWeek = [];
    currDay = DateTime.now().toISODate();

    constructor() {
        makeAutoObservable(this);
    }

    setDay = (day) => {
        this.currDay = day;
    };

    getDatesWeek = async () => {
        const { date: weekDate } = weekStore;

        const week = await getWeek(weekDate);

        if (!week) {
            return null;
        }

        const date = DateTime.fromISO(week.dateStart).setLocale("ru");

        this.datesWeek = Array(6)
            .fill("")
            .map((_, i) => {
                return date.plus({
                    days: i,
                });
            });
    };
}

export default new DatesStore();
