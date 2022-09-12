import {makeAutoObservable} from "mobx";
import _ from "lodash";
import sortArr from "../utils/sortArr";

class FilterStore {
    division = "";
    course = "";
    mode = "teacher"; // group | teacher | allGroups
    data = [];

    constructor() {
        makeAutoObservable(this);
    }

    setDivision = (division) => {
        this.division = division;
    };

    setCourse = (course) => {
        this.course = course;
    };

    setData = (data) => {
        this.data = data;
    };

    setMode = (mode) => {
        this.mode = mode;
        this.course = "";
        this.division = "";
    };

    getGroups = (division, course) => {
        const filteredLessons = this.data.filter(
            (lesson) =>
                lesson.division.name === division && lesson.group.course === course
        );

        return _.sortedUniq(
            sortArr(filteredLessons.map((lesson) => lesson.group.name))
        );
    };

    getTeachers = () => {
        const filteredLessons = this.data.filter(
            (lesson) => lesson.division.name === this.division
        );

        return _.sortedUniq(
            sortArr(filteredLessons.map((lesson) => lesson.teacher.name))
        );
    };
}

export default new FilterStore();
