import React from "react";
import "./sidebar.scss";
import { observer } from "mobx-react-lite";
import filterStore from "../../../../store/filterStore";
import viewModeStore from "../../../../store/viewModeStore";
import { Link, useParams } from "react-router-dom";
import {
    BtnTitle,
    FilterBtn,
    GroupTitle,
    Main,
    SidebarWrapper,
} from "./Sidebar.style";
import { Item, SwitchWrapper } from "../../Filter/Switch/Switch.styled";
import FilterIcon from "../../../../assets/img/filter-icon.png";
// import WeekSwitcher from "../../Filter/WeekSwitcher/WeekSwitcher";

function Sidebar({ lessons }) {
    const { view, setView } = viewModeStore;
    const { mode, groups } = filterStore;
    const { id } = useParams();
    const currGroup = groups.find((group) => group.id_1c === id);
    const changeModeHandle = () => setView(view === "day" ? "week" : "day");

    const currEntity = {
        group: `группа ${lessons[0]?.group.name}`,
        teacher: lessons[0]?.teacher.abb_name,
        cabinet: lessons[0]?.cabinet?.name,
    };

    const filterButton = (
        <Link to="/timetable">
            <FilterBtn>
                <img alt="иконка" src={FilterIcon} />
                <BtnTitle>Поиск</BtnTitle>
            </FilterBtn>
        </Link>
    );

    const groupName = currGroup ? `группа ${currGroup?.name}` : null;
    const title = mode === "group" ? groupName : currEntity[mode];

    const group = <GroupTitle>{title ?? ""}</GroupTitle>;

    // string below this is legacy code which use unstable library mui
    // const group = <GroupTitle>{title ?? <Skeleton width={100} />}</GroupTitle>;

    const changeModeComponent = (
        <SwitchWrapper onClick={changeModeHandle}>
            <Item active={view === "day"}>День</Item>
            <Item active={view === "week"}>Неделя</Item>
        </SwitchWrapper>
    );

    return (
        <SidebarWrapper>
            <Main>
                {filterButton}
                {group}
                {changeModeComponent}
            </Main>
            {/* TODO: integrate WeekSwitcher and configure Shedule.jsx for it */}
                {/* <WeekSwitcher /> */}
        </SidebarWrapper>
    );
}

export default observer(Sidebar);
