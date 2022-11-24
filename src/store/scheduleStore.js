import {makeAutoObservable} from "mobx";
import API, {getWeek} from "../lib/API";
import {DateTime} from "luxon";
import _ from "lodash";
import datesStore from "./datesStore";
import filterStore from "./filterStore";
import groupLessons from "../lib/groupLessons";

class ScheduleStore {
    allLessons = [];
    currLessons = [];
    currWeek = null;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    getCurrentWeek = async () => {
        this.loading = true;

        try {
            const currDate = DateTime.now().toISODate();
            const currWeek = await getWeek(currDate);
            if (currWeek.data.length === 0) {
                return;
            }
            this.currWeek = currWeek.data[0]
            return currWeek.data[0]
        } catch (e) {
            console.error(e);
        } finally {
            this.loading = false;
        }
    };

    getDayLessons = async (divisionName) => {
        const value = filterStore.mode === "allGroups" ? "group.name" : "cabinet.number";

        try {
            this.loading = true;
            const week = await this.getCurrentWeek()
            const reqLessons = await API.getDivisionLessonsForWeek(week._id, divisionName)
            const lessonsToday = _.sortBy(reqLessons.data.filter(lesson => lesson.date === datesStore.currDay), "group.name")
            const groupLessons = _.groupBy(lessonsToday, value)

            return Object.entries(groupLessons)
        } catch (e) {
            console.error(e);
        } finally {
            this.loading = false;
        }
    }


    setLessonsByGroup = async (groupId) => {
        this.loading = true;
        try {
            const week = await this.getCurrentWeek()
            const reqLessons = await API.getGroupLessonsForWeek(week._id, groupId)
            this.currLessons = reqLessons.data
        } catch (e) {
            console.error(e);
        } finally {
            this.loading = false;
        }
    };

    setLessonsByTeacher = async (teacherName) => {
        this.loading = true;
        try {
            const week = await this.getCurrentWeek()
            const reqLessons = await API.getTeacherLessonsForWeek(week._id, teacherName)
            this.currLessons = reqLessons.data
        } catch (e) {
            console.error(e);
        } finally {
            this.loading = false;
        }
    };

    getLessonsForCabinets = async (divisionName) => {
        try {
            this.loading = true;
            const week = await this.getCurrentWeek()
            const reqLessons = await API.getDivisionLessonsForWeek(week._id, divisionName)
            this.currLessons = reqLessons.data
            return reqLessons.data
        } catch (e) {
            console.error(e);
        } finally {
            this.loading = false;
        }
    }

    setLessons = (value) => {
        this.currLessons = value
    }
}

export default new ScheduleStore();
