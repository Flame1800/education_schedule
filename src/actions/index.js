import { createAction } from 'redux-actions';
import axios from 'axios';
import { DateTime } from 'luxon';

export const loadSheduleRequest = createAction("LOAD_SHEDULE_REQUEST");
export const loadSheduleSuccess = createAction("LOAD_SHEDULE_SUCCESS");
export const loadSheduleFailure = createAction("LOAD_SHEDULE_FAILURE");
export const loadSheduleEmpty = createAction("LOAD_SHEDULE_EMPTY");

export const loadFilterData = createAction("LOAD_FILTER_LIST");
export const filteredInDivisions = createAction("FILTERED_IN_DIVISONS");
export const clearFilter = createAction("CLEAR_FILTER");
export const switchFilter = createAction("SWITCH_FILTER");
export const pushProp = createAction('PUSH_PROP');

export const loadDaysCurrWeek = createAction("LOAD_DAYS_CURR_WEEK");
export const loadCurrLessons = createAction("LOAD_CURR_LESSONS");
export const changeMode = createAction("CHANGE_MODE");
export const changeDataLoadMode = createAction("CHANGE_DATA_LOAD_MODE");
export const changeDateLoad = createAction("CHANGE_DATE_LOAD");
export const selectDay = createAction("SELECT_DAY");
export const filterCurrLessons = createAction("FILTER_CURR_LESSONS");
export const setDateWeek = createAction("SET_DATE_WEEK");

export const loadShedule = (mode = 'curr') => async (dispatch) => {
    dispatch(loadSheduleRequest());
    try {
        let { year, month, day } = DateTime.local();

        if (mode === 'next') {
            day = Number(day) + 7 > 30 ? (Number(day) - 30) - 7 : Number(day) + 7;
        }

        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;
        const currDate = `${year}-${month}-${day}`;

        const currWeek = await axios.get(`${process.env.REACT_APP_API_URL}/schedule/api/weeks/date/${currDate}`);
        if (Object.keys(currWeek.data).length === 0) {
            dispatch(loadSheduleEmpty());
        }
        else {
            dispatch(setDateWeek({ date: currWeek.data[0].dateStart }));
            const idCurrWeek = currWeek.data[0]._id;
            const responce = await axios.get(`${process.env.REACT_APP_API_URL}/schedule/api/lessons/week/${idCurrWeek}`);
            const { data } = responce;

            if (data.length === 0) {
                dispatch(loadSheduleEmpty());
            }
            else {
                dispatch(loadSheduleSuccess({ data }));
                dispatch(loadDaysCurrWeek({ week: currWeek.data[0] }));

                if (window.localStorage.item && window.localStorage.mode) {
                    const { item, mode } = window.localStorage;

                    const prop = {
                        data,
                        filter: { group: item },
                        mode,
                    }

                    dispatch(pushProp({ prop }))
                }
            }
        }

    } catch (e) {
        dispatch(loadSheduleFailure());
        throw e;
    }
}