import React from "react";
import "./sidebar.scss";
import {observer} from "mobx-react-lite";
import filterStore from "../../../../store/filterStore";
import viewModeStore from "../../../../store/viewModeStore";
import {Link} from "react-router-dom";
import {BtnTitle, FilterBtn, GroupTitle, Main, SidebarWrapper} from "./Sidebar.style";
import {Item, SwitchWrapper} from "../../Filter/Switch/Switch.styled";
import FilterIcon from '../../../../assets/img/filter-icon.png'
import {Skeleton} from "@mui/material";

function Sidebar({lessons}) {
    const {view, setView} = viewModeStore;
    const {mode} = filterStore;

    const changeModeHandle = () => setView(view === "day" ? "week" : "day");

    const currEntity = {
        group: `${lessons[0]?.group.name} группа`,
        teacher: lessons[0]?.teacher.abb_name,
        cabinet: lessons[0]?.cabinet?.name,
    };

    const filterButton = (
        <Link to="/timetable">
            <FilterBtn>
                <img alt='иконка' src={FilterIcon}/>
                <BtnTitle>Поиск</BtnTitle>
            </FilterBtn>
        </Link>
    );

    const group = <GroupTitle>{lessons.length ? currEntity[mode] : <Skeleton width={150} height={40}/>}</GroupTitle>;

    const changeModeComponent = (
        <SwitchWrapper onClick={changeModeHandle}>
            <Item active={view === "day"}>
                День
            </Item>
            <Item active={view === "week"}>
                Неделя
            </Item>
        </SwitchWrapper>
    );

    return (
        <SidebarWrapper>
            <Main>
                {filterButton}
                {group}
                {changeModeComponent}
            </Main>
        </SidebarWrapper>
    );
}

export default observer(Sidebar);
