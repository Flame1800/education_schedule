import React from "react";
import "./switch.scss";
import {observer} from "mobx-react-lite";
import entrySearch from "../../../../store/entrySearch";
import {mods} from "../../../../assets/filterParamsData";
import filterStore from "../../../../store/filterStore";
import {Item, SwitchWrapper} from "./Switch.styled";

const Switch = () => {
    const {setMode, mode} = filterStore;

    const switchHandler = (value) => {
        setMode(value);
        entrySearch.setValue("");
    };

    return (
        <SwitchWrapper fixed>
            {mods.map((currMode, id) => (
                <Item active={mode === currMode.value}
                      key={id}
                      onClick={() => switchHandler(currMode.value)}
                >
                    {currMode.name}
                </Item>
            ))}
        </SwitchWrapper>
    );
};

export default observer(Switch);
