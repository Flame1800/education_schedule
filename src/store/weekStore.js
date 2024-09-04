import { DateTime } from "luxon";
import { action, makeObservable, observable } from "mobx";

class WeekStore {
    constructor() {
        makeObservable(this, {
            // variables
            week: observable,
            date: observable,

            // setters
            setWeek: action,
            setDate: action,
        });
    }

    week = null;
    date = DateTime.now();

    /**
     * setter of week
     * @param {object} week
     */
    setWeek = (week) => {
        this.week = week;
    };

    /**
     * setter of date
     * @param {DateTime} date date
     */
    setDate = (date) => {
        if (typeof date === "string") {
            this.date = DateTime.fromISO(date);
        } else {
            this.date = date;
        }
    };
}

export default new WeekStore();
