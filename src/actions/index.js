import { createAction } from 'redux-actions';
import axios from 'axios';

export const loadSheduleRequest = createAction("LOAD_SHEDULE_REQUEST");
export const loadSheduleSuccess = createAction("LOAD_SHEDULE_SUCCESS");
export const loadSheduleFailure = createAction("LOAD_SHEDULE_FAILURE");

export const loadShedule = () => async (dispatch) => {
    dispatch(loadSheduleRequest());
    try {
        const data = axios.get('http://1c.surpk.ru/schedule/api');
        dispatch(loadSheduleSuccess())
    } catch (e) {
        dispatch(loadSheduleFailure());
        throw e;
    }
}