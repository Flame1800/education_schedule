import {makeAutoObservable} from "mobx";
import schedule from "./scheduleStore";
import _ from "lodash/fp";
import sortArr from "../lib/sortArr";
import filterStore from "./filterStore";

class EntrySearch {
    value = "";
    results = [];

    constructor() {
        makeAutoObservable(this);
    }

    setValue = (value) => {
        this.value = value;
    };

    getResults = () => {
        const {mode} = filterStore;
        const lowerCaseValue = this.value.toLocaleLowerCase();

        const results = schedule.allLessons
            .filter(
                (lesson) =>
                    lesson[mode]?.name.toLocaleLowerCase().includes(lowerCaseValue) ||
                    null
            )
            .map((lesson) => lesson[mode]?.name || null);

        this.results = _.sortedUniq(sortArr(results));
    };
}

export default new EntrySearch();
