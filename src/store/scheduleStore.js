import {makeAutoObservable} from "mobx";
import API, {getWeek} from "../utils/API";
import {DateTime} from "luxon";

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
        } catch (e) {
            console.error(e);
        } finally {
            this.loading = false;
        }
    };


    setLessonsByGroup = async (groupId) => {
        const reqLessons = await API.getGroupLessonsForWeek(this.currWeek._id, groupId)
        this.currLessons = reqLessons.data
    };

    setLessonsByTeacher = async (teacherName) => {
        const reqLessons = await API.getTeacherLessonsForWeek(this.currWeek._id, teacherName)
        this.currLessons = reqLessons.data
    };

    setLessonsByDivison = async (divisionId) => {
        const reqLessons = await API.getDivisionLessonsForWeek(this.currWeek._id, divisionId)
        this.currLessons = reqLessons.data
    }

    setLessons = (value) => {
        this.currLessons = value
    }
}

export default new ScheduleStore();
