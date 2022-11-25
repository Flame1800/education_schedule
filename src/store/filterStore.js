import {makeAutoObservable, toJS} from "mobx";
import _ from "lodash";
import sortArr from "../lib/sortArr";
import API from "../lib/API";
import scheduleStore from "./scheduleStore";
import division from "../componets/Views/Filter/FillterTabs/FilterParams/FilterParam";

class FilterStore {
    division = "";
    course = "";
    divisions = []
    groups = []
    mode = "group"; // group | teacher | allGroups
    data = [];

    constructor() {
        makeAutoObservable(this);
    }

    getGroups = async () => {
        const req = await API.getGroups()
        this.groups = _.sortBy(req.data, ["name"]).filter(item => item.name.slice(0, 1) !== "З")
    }

    getDivisions = async () => {
        const req = await API.getDivisions()

        this.divisions = _.sortBy(req.data.map(item => {
            return {
                ...item,
                num: Number(item.abb_name.slice(1, 2))
            }
        }), ["num"])
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
