import {action, makeObservable, observable} from "mobx";
import _ from "lodash";
import sortArr from "../lib/sortArr";
import {getDivisions, getDivisionWeekLessons, getGroups as getGroupsReq} from "../lib/API";
import weekStore from "./weekStore";

class FilterStore {
    division = "";
    divisions = [];
    course = "";
    groups = [];
    mode = "group"; // group | teacher | allGroups
    data = [];
    loading = false

    constructor() {
        makeObservable(this, {
            // states
            division: observable,
            divisions: observable,
            course: observable,
            groups: observable,
            mode: observable,
            data: observable,
            loading: observable,

            // actions
            getGroups: action,
            getDivisions: action,
            getTeachers: action,
            setDivision: action,
            setCourse: action,
            setMode: action,
        });
    }

    getGroups = async () => {
        this.divisions = []
        const req = await getGroupsReq()
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
        const { week } = weekStore;

        try {
            this.loading = true
            const filteredLessons = await getDivisionWeekLessons(week._id, divisionId)
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
