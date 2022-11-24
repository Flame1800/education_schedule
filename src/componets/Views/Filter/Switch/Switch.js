import React from "react";
import "./switch.scss";
import {observer} from "mobx-react-lite";
import entrySearch from "../../../../store/entrySearch";
import {mods} from "../../../../assets/filterParamsData";
import filterStore from "../../../../store/filterStore";

const Switch = () => {
    const {setMode, mode} = filterStore;

    const switchHandler = (value) => {
        setMode(value);
        entrySearch.setValue("");
    };

    return (
        <div className="switch-head">
            {mods.map((currMode, id) => (
                <div
                    key={id}
                    onClick={() => switchHandler(currMode.value)}
                    className={mode === currMode.value ? "active-item" : "passive-item"}
                >
                    {currMode.name}
                </div>
            ))}
        </div>
    );
};

export default observer(Switch);
