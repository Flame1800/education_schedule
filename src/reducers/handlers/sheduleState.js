import { handleActions } from 'redux-actions';
import * as actions from '../../actions/index';

export default handleActions({
    [actions.loadSheduleSuccess]() {
        return 'ready';
    },
    [actions.loadSheduleRequest]() {
        return 'loading';
    },
    [actions.loadSheduleFailure]() {
        return 'failed';
    },
    [actions.loadSheduleEmpty]() {
        return 'empty';
    }
}, 'none');