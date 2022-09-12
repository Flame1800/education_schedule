import React from "react";
import entrySearch from "../../../store/entrySearch";
import {observer} from "mobx-react-lite";
import filterStore from "../../../store/filterStore";
import scheduleStore from "../../../store/scheduleStore";

const captions = {
    group: "Введите номер группы:",
    teacher: "Введите фамилию:",
    cabinet: "Введите номер кабинета:",
};

const Search = () => {
    const searchHandler = (e) => {
        entrySearch.setValue(e.target.value);
        entrySearch.getResults();
    };

    const {mode} = filterStore;
    const {setLessonsByGroup, setLessonsByTeacher} = scheduleStore;

    const caption = (
        <label htmlFor="search" className="label-input">
            {captions[mode]}
        </label>
    );

    const setLessons = (item) => {
        if (mode === "teacher") setLessonsByTeacher(item);
        if (mode === "group") setLessonsByGroup(item);
    };

    const results = entrySearch.results.map((item, id) => {
        return (
            <div key={id} onClick={() => setLessons(item)} className="item">
                {item}
            </div>
        );
    });

    return (
        <div className="search">
            {caption}
            <div className="search-cont">
                <input
                    type="text"
                    placeholder="Поиск"
                    value={entrySearch.value}
                    onChange={(e) => searchHandler(e)}
                />
                {entrySearch.value.length !== 0 && (
                    <div className="search-results">{results}</div>
                )}
            </div>
        </div>
    );
};

export default observer(Search);
