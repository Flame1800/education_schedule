import { handleActions } from 'redux-actions';
import * as actions from '../../actions/index';

export default handleActions({
    [actions.changeMode](state) {
        return {
            mode: state.mode === 'week' ? 'day' : 'week', 
            dataLoadMode: state.dataLoadMode,
            dateLoad: state.dateLoad
        };
    },
    [actions.changeDataLoadMode](state, { payload: {mode} }) {
        return {
            dataLoadMode: mode,
            mode: state.mode,
            dateLoad: state.dateLoad
        };
    },
    [actions.changeDateLoad](state) {
        return {
            dateLoad: state.dateLoad === 'curr' ? 'next' : 'curr', 
            mode: state.mode,
            dataLoadMode: state.dataLoadMode
        };
    }
}, { mode: 'week', dataLoadMode: 'student', dateLoad: 'curr' });