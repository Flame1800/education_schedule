import { makeAutoObservable } from "mobx";
import { DateTime } from "luxon";
import datesStore from "./datesStore";
import weekModeViews from "../consts/weekModeViews";
import filterLessonsByDate from "../lib/filterLessonsByDate";
import sortLessonsByGroup from "../lib/sortLessonsByGroup";
import groupLessons from "../lib/groupLessons";
import { getDivisionWeekLessons, getGroupWeekLessons, getTeacherWeekLessons, getWeek } from "../lib/API";


class ScheduleStore {
  currWeek = null;
  currDate = DateTime.now().toISODate()
  loading = false;
  weekMode = weekModeViews.curr;

  constructor() {
    makeAutoObservable(this);
  }

  getCurrentWeek = async () => {
    this.loading = true;


    const currDay = DateTime.now()

    // Тестовые данные
    // console.log("getCurrentWeek", DateTime.fromISO("2023-05-15"));
    // console.log("getCurrentWeek", currDay);

    try {
      let currDate = currDay.toISODate()

      if (this.weekMode === weekModeViews.next) {
        currDate = currDay.plus({ weeks: 1 });
      }

      this.currDate = currDate

      const currWeek = await getWeek(currDate);

      if (currWeek.data.length === 0) {
        this.currWeek = +null
      }

      this.currWeek = currWeek.data[0]
      return currWeek.data[0]
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  };

  changeWeek = (mode) => {
    this.weekMode = mode
  }

  getDayLessons = async (divisionName) => {
    this.loading = true;

    try {
      const week = await this.getCurrentWeek()
      const reqLessons = await getDivisionWeekLessons(week._id, divisionName)

      const dayLessons = filterLessonsByDate(reqLessons.data, datesStore.currDay)
      const sortedDayLessons = sortLessonsByGroup(dayLessons)
      return groupLessons(sortedDayLessons, "group.name")
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
      const reqLessons = await getGroupWeekLessons(week._id, groupId)
      return reqLessons.data
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
      const reqLessons = await getTeacherWeekLessons(week._id, teacherName)
      return reqLessons.data
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  };

  getLessonsForCabinets = async (divisionName) => {
    this.loading = true;

    try {
      const week = await this.getCurrentWeek()
      const reqLessons = await getDivisionWeekLessons(week._id, divisionName)
      const dayLessons = filterLessonsByDate(reqLessons.data, datesStore.currDay)
      const sortedDayLessons = sortLessonsByGroup(dayLessons)
      return groupLessons(sortedDayLessons, "cabinet.number")
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }
}

export default new ScheduleStore();
