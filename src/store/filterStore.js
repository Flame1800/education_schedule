import {makeAutoObservable, toJS} from "mobx";
import _ from "lodash";
import sortArr from "../utils/sortArr";
import API from "../utils/API";
import scheduleStore from "./scheduleStore";
import division from "../componets/Filter/FilterParams/Division";

class FilterStore {
    division = "";
    course = "";
    divisions = []
    groups = []
    teachers = []
    mode = "group"; // group | teacher | allGroups
    data = [];

    constructor() {
        makeAutoObservable(this);
    }

    getGroups = async () => {
        const req = await API.getGroups()
        this.groups = req.data
    }

    getDivisions = async () => {
        const req = await API.getDivisions()
        this.divisions = req.data
    }

    getTeachers = async (divisionId) => {
        const filteredLessons = await API.getDivisionLessonsForWeek(scheduleStore.currWeek._id, divisionId)

        return _.sortedUniq(
            sortArr(filteredLessons.data.map((lesson) => lesson.teacher.abb_name))
        );
    };

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
}

export default new FilterStore();
