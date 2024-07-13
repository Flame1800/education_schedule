import { action, makeObservable, observable } from "mobx";

class filtersChoosingStore {
    #mode = "group";
    #divisionId = null;

    #course = null; // relevant only for group mode 
    #teacherName = null; // relevant only for teacher mode

    constructor() {
        makeObservable(this, {
            // states
            mode: observable,
            divisionId: observable,
            teacherName: observable,
            course: observable,

            // actions
            setCourse: action,
            setDivisionId: action,
            setMode: action,
            setTeacherName: action,

            getCourse: action,
            getDivisionId: action,
            getMode: action,
            getTeacherName: action,
        });
    }

    setMode(value) {
        this.#mode = value;
    }

    getMode() {
        return this.#mode;
    }

    setDivisionId(value) {
        this.#divisionId = value;
    }

    getDivisionId() {
        return this.#divisionId;
    }

    setTeacherName(value) {
        this.#teacherName = value;
    }

    getTeacherName() {
        return this.#teacherName;
    }

    setCourse(value) {
        this.#course = value;
    }

    getCourse() {
        return this.#course;
    }
}

export default new filtersChoosingStore();