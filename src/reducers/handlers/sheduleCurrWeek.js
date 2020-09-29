import { handleActions } from 'redux-actions';
import * as actions from '../../actions/index';

export default handleActions({
    [actions.loadSheduleSuccess](state, {payload: { data }}) {
        return data;
    }
}, {});