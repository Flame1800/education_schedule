import {makeAutoObservable} from "mobx";
import {DateTime} from "luxon";
import scheduleStore from "./scheduleStore";

class DatesStore {
    datesWeek = [];
    currDay = DateTime.now().toISODate()

    constructor() {
        makeAutoObservable(this);
    }

    setDay = (day) => {
        this.currDay = day
    }

    getDatesWeek = () => {
        const {currWeek: {dateStart}} = scheduleStore

        const date = DateTime.fromISO(dateStart).setLocale('ru')

        this.datesWeek = Array(6).fill('').map((_, i) => {
            return date.plus({
                days: i
            });
        })
    }
}

export default new DatesStore()