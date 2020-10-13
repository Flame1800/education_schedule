import { handleActions } from 'redux-actions';
import * as actions from '../../actions/index';

export default handleActions({
    [actions.changeMode](state, {payload: prop }) {
        return prop;
    }
}, {mode: 'week', data: []});