import { makeAutoObservable } from "mobx";
import datesStore from "./datesStore";
import filterLessonsByDate from "../lib/filterLessonsByDate";
import sortLessonsByGroup from "../lib/sortLessonsByGroup";
import groupLessons from "../lib/groupLessons";
import {
    getDivisionWeekLessons,
    getGroupWeekLessons,
    getTeacherWeekLessons,
    getWeek,
} from "../lib/API";
import weekStore from "./weekStore";

class ScheduleStore {
    constructor() {
        makeAutoObservable(this);
    }
    loading = false;

    getDayLessons = async (divisionName) => {
        const { date } = weekStore;

        try {
            const week = await getWeek(date);

            const reqLessons = await getDivisionWeekLessons(
                week._id,
                divisionName
            );

            const dayLessons = filterLessonsByDate(
                reqLessons.data,
                datesStore.currDay
            );

            const sortedDayLessons = sortLessonsByGroup(dayLessons);
            return groupLessons(sortedDayLessons, "group.name");
        } catch (e) {
            console.error(e);
        }
    };

    setLessonsByGroup = async (groupId) => {
        const { date } = weekStore;

        try {
            const week = await getWeek(date);

            const reqLessons = await getGroupWeekLessons(week._id, groupId);

            return reqLessons.data;
        } catch (e) {
            console.error(e);
        } finally {
            this.loading = false;
        }
    };

    setLessonsByTeacher = async (teacherName) => {
        const { date } = weekStore;

        try {
            const week = await getWeek(date);

            const reqLessons = await getTeacherWeekLessons(
                week._id,
                teacherName
            );

            return reqLessons.data;
        } catch (e) {
            console.error(e);
        }
    };

    getLessonsForCabinets = async (divisionName) => {
        const { date } = weekStore;

        try {
            const week = await getWeek(date);

            const reqLessons = await getDivisionWeekLessons(
                week._id,
                divisionName
            );

            const dayLessons = filterLessonsByDate(
                reqLessons.data,
                datesStore.currDay
            );

            const sortedDayLessons = sortLessonsByGroup(dayLessons);

            return groupLessons(sortedDayLessons, "cabinet.number");
        } catch (e) {
            console.error(e);
        }
    };
}

export default new ScheduleStore();
