import { handleActions } from 'redux-actions';
import * as actions from '../../actions/index';

export default handleActions({
    [actions.switchFilter](state) {
        return {
            filter: !state.filter,
            dateCurrWeek: state.dateCurrWeek
        };
    },
    [actions.setDateWeek](state, { payload: { date } }) {
        return {
            filter: state.filter,
            dateCurrWeek: date.slice(0, 10)
        };
    }
}, { filter: true, dateCurrWeek: '' });