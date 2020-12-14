import { handleActions } from 'redux-actions';
import * as actions from '../../actions/index';

export default handleActions({
    [actions.changeMode](state) {
        return { mode: state.mode === 'week' ? 'day' : 'week', dataLoadMode: state.dataLoadMode };
    },
    [actions.changeDataLoadMode] (state) {
        return { dataLoadMode: state.dataLoadMode === 'student' ? 'teacher' : 'student', mode: state.mode };
    }
}, { mode: 'week', dataLoadMode: 'student' });