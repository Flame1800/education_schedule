import {makeAutoObservable, toJS} from "mobx";
import _ from "lodash";
import sortArr from "../lib/sortArr";
import API, {getDivisions, getDivisionWeekLessons, getGroups} from "../lib/API";
import scheduleStore from "./scheduleStore";
import division from "../componets/Views/Filter/FillterTabs/FilterParams/FilterParam";

class FilterStore {
    division = "";
    course = "";
    divisions = []
    groups = []
    mode = "group"; // group | teacher | allGroups
    data = [];
    loading = false

    constructor() {
        makeAutoObservable(this);
    }

    getGroups = async () => {
        this.divisions = []
        const req = await getGroups()
        this.groups = _.sortBy(req.data, ["name"]).filter(item => item.name.slice(0, 1) !== "З")
    }

    getDivisions = async () => {
        this.divisions = []
        const req = await getDivisions()

        this.divisions = _.sortBy(req.data.map(item => {
            return {
                ...item,
                num: Number(item.abb_name.slice(1, 2))
            }
        }), ["num"])
    }

    getTeachers = async (divisionId) => {
        try {
            this.loading = true
            const filteredLessons = await getDivisionWeekLessons(scheduleStore.currWeek._id, divisionId)
            return _.sortedUniq(sortArr(filteredLessons.data.map((lesson) => lesson.teacher.abb_name)));
        } catch (e) {
            console.error(e)
        } finally {
            this.loading = false
        }
    };

    setDivision = (division) => {
        this.division = division;
    };

    setCourse = (course) => {
        this.course = course;
    };

    setMode = (mode) => {
        this.mode = mode;
        this.course = "";
        this.division = "";
    };
}

export default new FilterStore();
