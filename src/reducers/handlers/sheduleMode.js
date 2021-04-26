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
    [actions.changeDataLoadMode](state) {
        return {
            dataLoadMode: state.dataLoadMode === 'student' ? 'teacher' : 'student', 
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