import { handleActions } from 'redux-actions';
import * as actions from '../../actions/index';

export default handleActions({
    [actions.changeMode](state) {
        return { mode: state.mode === 'week' ? 'day' : 'week' };
    }
}, { mode: 'week' });