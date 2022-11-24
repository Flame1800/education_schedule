import React from "react";
import "./sidebar.scss";
import {observer} from "mobx-react-lite";
import scheduleStore from "../../store/scheduleStore";
import filterStore from "../../store/filterStore";
import viewModeStore from "../../store/viewModeStore";
import {DateTime} from "luxon";
import {Link} from "react-router-dom";

function Sidebar() {
    const {currLessons} = scheduleStore;
    const {view, setView} = viewModeStore;
    const {mode} = filterStore;

    const changeModeHandle = () => setView(view === "day" ? "week" : "day");

    const currEntity = {
        group: `${currLessons[0]?.group.name} группа`,
        teacher: currLessons[0]?.teacher.abb_name,
        cabinet: currLessons[0]?.cabinet?.name,
    };

    const filterButton = (
        <Link to="/">
            <div className="btn-filter">
                <div className="icon"/>
                <div className="text">Поиск</div>
            </div>
        </Link>
    );

    const group = <div className="group">{currLessons.length ? currEntity[mode] : "загрузка..."}</div>;

    const changeModeComponent = (
        <div className="switch-head" onClick={changeModeHandle}>
            <div className={view === "day" ? "active-item" : "passive-item"}>
                День
            </div>
            <div className={view === "week" ? "active-item" : "passive-item"}>
                Неделя
            </div>
        </div>
    );

    return (
        <div className="sidebar">
            <div className="main-container">
                {filterButton}
                {group}
                {changeModeComponent}
            </div>
        </div>
    );
}

export default observer(Sidebar);
