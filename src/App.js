import React from "react";
import "./app.scss";
import Filter from "./componets/Filter";
import schedule from "./store/scheduleStore";
import {observer} from "mobx-react-lite";
import Schedule from "./componets/Schedule";
import filterStore from "./store/filterStore";

function App() {
    React.useEffect(() => {
        schedule.getCurrentWeek()
        filterStore.getDivisions()
        filterStore.getGroups()
    }, []);


    const wrap = (component) => {
        return <div className="shadow-container">{component}</div>;
    };

    const loading = wrap(<div className="no-lessons">Загрузка...</div>);

    const lessonsIsSelect = schedule.currLessons.length === 0;
    const view = lessonsIsSelect ? wrap(<Filter/>) : <Schedule/>;

    return (
        <div className="App">
            {schedule.loading ? loading : view}
        </div>
    );
}

export default observer(App);
