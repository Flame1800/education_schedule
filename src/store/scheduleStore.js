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

    getLessons = async () => {
        this.loading = true;

        try {
            const currDate = DateTime.now().toISODate();
            const currWeek = await getWeek(currDate);

            if (currWeek.data.length === 0) {
                return;
            }

            this.currWeek = currWeek.data[0]
            const idCurrWeek = currWeek.data[0]._id;
            const lessons = await API.getLessonsForWeek(idCurrWeek);

            this.allLessons = lessons.data;
        } catch (e) {
            console.error(e);
        } finally {
            this.loading = false;
        }
    };

    setLessonsByGroup = (group) => {
        this.currLessons = this.allLessons.filter(
            (lesson) => lesson.group.name === group
        );
    };

    setLessonsByTeacher = (teacher) => {
        this.currLessons = this.allLessons.filter(
            (lesson) => lesson.teacher.name === teacher
        );
    };

    setLessonsByDivison = (division) => {
        this.currLessons = this.allLessons.filter(
            (lesson) => lesson.division.name === division
        );
    }

    setLessons = (value) => {
        this.currLessons = value
    }
}

export default new ScheduleStore();
