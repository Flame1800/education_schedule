import React from "react";
import "./app.scss";
import Filter from "./componets/Filter";
import schedule from "./store/scheduleStore";
import {observer} from "mobx-react-lite";
import Schedule from "./componets/Schedule";
import {Route, Routes} from "react-router-dom";
import AllGroupsFilter from "./componets/Filter/AllGroupsFilter";

function App() {
    React.useEffect(() => {
        schedule.getLessons();
    }, []);


    const wrap = (component) => {
        return <div className="shadow-container">{component}</div>;
    };

    const empty = wrap(<div className="no-lessons">Нет данных</div>);
    const loading = wrap(<div className="no-lessons">Загрузка...</div>);

    const lessonsIsSelect = schedule.currLessons.length === 0;

    const view = lessonsIsSelect ? wrap(<Filter/>) : <Schedule/>;
    const content = schedule.allLessons.length === 0 ? empty : view;

    return (
        <div className="App">
            {schedule.loading ? loading : content}
        </div>
    );
}

export default observer(App);
