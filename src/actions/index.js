import { createAction } from 'redux-actions';
import axios from 'axios';
import {DateTime} from 'luxon';

export const loadSheduleRequest = createAction("LOAD_SHEDULE_REQUEST");
export const loadSheduleSuccess = createAction("LOAD_SHEDULE_SUCCESS");
export const loadSheduleFailure = createAction("LOAD_SHEDULE_FAILURE");

export const loadFilterData = createAction("LOAD_FILTER_LIST");
export const filteredInDivisions = createAction("FILTERED_IN_DIVISONS");
export const clearFilter = createAction("CLEAR_FILTER");
export const switchFilter = createAction("SWITCH_FILTER");

export const loadDaysCurrWeek = createAction("LOAD_DAYS_CURR_WEEK");
export const loadCurrLessons = createAction("LOAD_CURR_LESSONS");
export const changeMode = createAction("CHANGE_MODE");
export const changeDataLoadMode = createAction("CHANGE_DATA_LOAD_MODE");
export const selectDay = createAction("SELECT_DAY");

export const loadShedule = (mode = 'curr') => async (dispatch) => {
    dispatch(loadSheduleRequest());
    try {
        // let {year, month, day} = DateTime.local();
        let {year, month, day} = {year: '2020', month: '11', day: '2'};

        if (mode === 'next') {
            day = Number(day) + 7 > 30 ? (Number(day) - 30) - 7 : Number(day) + 7;
        }

        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;
        const currDate = `${year}-${month}-${day}`;

        console.log(currDate);
        const currWeek = await axios.get(`http://1c.surpk.ru/schedule/api/weeks/date/${currDate}`);
        const idCurrWeek = currWeek.data[0]._id;
        const responce = await axios.get(`http://1c.surpk.ru/schedule/api/lessons/week/${idCurrWeek}`);
        const { data } = responce;
        
        dispatch(loadSheduleSuccess({data}));
        dispatch(loadDaysCurrWeek({ week: currWeek.data[0] }));
    } catch (e) {
        dispatch(loadSheduleFailure());
        throw e;
    }
}