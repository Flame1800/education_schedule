import React from 'react';
import styled from "styled-components";
import weekModeViews from "../../../consts/weekModeViews";
import schedule from "../../../store/scheduleStore";

const SwitchWeekBtn = () => {
    const {weekMode, changeWeek, getCurrentWeek} = schedule

    const changeWeekHandle = () => {
        (async () => {
            const mode = weekMode === weekModeViews.next ? weekModeViews.curr : weekModeViews.next
            changeWeek(mode)
            await getCurrentWeek()
        })()
    }

    return (
        <WrapperLabel>
            <input type='checkbox' onChange={changeWeekHandle} value={weekModeViews.next === weekMode} id='week'
                   name="week"/>
            <label htmlFor="week">
                <div className="check">
                    <div className="inner"/>
                </div>
                <span className='text'>
                    Следующая неделя
                </span>
            </label>
        </WrapperLabel>
    );
};

const WrapperLabel = styled.div`
    display: flex;
    align-items: center;
    
    @media screen and (max-width: 425px) {
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 20px;
    }

    * {
        cursor: pointer;
    }

    input {
        display: none;
    }

    input:checked + label {
        .inner {
            display: flex;
        }

        background: #ffc859;
    }

    label {
        display: flex;
        align-items: center;
        margin-bottom: 0;
        padding: 10px 20px;
        border-radius: 10px;
        background: #FFD888;
        border: 1px solid #E5A31B;
        user-select: none;
    }

    .check {
        border-radius: 7px;
        border: 1px solid #E5A31B;
        background: white;
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .inner {
        width: 12px;
        height: 12px;
        background: #E5A31B;
        border-radius: 3px;
        display: none;
    }

    .text {
        color: #414141;
        text-align: center;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-left: 10px;
    }
`

export default SwitchWeekBtn;