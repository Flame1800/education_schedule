import React from "react";
import "./sidebar.scss";
import {observer} from "mobx-react-lite";
import scheduleStore from "../../store/scheduleStore";
import filterStore from "../../store/filterStore";
import viewModeStore from "../../store/viewModeStore";
import {DateTime} from "luxon";

function Sidebar() {
    const {currLessons, setLessons} = scheduleStore;
    const {view, setView} = viewModeStore;
    const {mode, setMode} = filterStore;

    const openFilterHandle = () => {
        setLessons([])
        setMode('group')
    };
    const changeModeHandle = () => setView(view === "day" ? "week" : "day");

    const currEntity = {
        group: `${currLessons[0].group.name} группа`,
        teacher: currLessons[0].teacher.abb_name,
        cabinet: currLessons[0]?.cabinet?.name,
    };

    const filterButton = (
        <div className="btn-filter" onClick={openFilterHandle}>
            <div className="icon"></div>
            <div className="text">Поиск</div>
        </div>
    );

    const group = <div className="group">{currEntity[mode]}</div>;

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
                {mode === 'allGroups'
                    ? <div className='today-date'>{DateTime.now().toISODate()}</div>
                    : changeModeComponent}
            </div>
        </div>
    );
}

export default observer(Sidebar);
