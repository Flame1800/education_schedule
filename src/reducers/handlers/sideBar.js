import { handleActions } from 'redux-actions';
import * as actions from '../../actions/index';
import _ from 'lodash';

export default handleActions({
    [actions.switchFilter](state) {
        return {filter: !state.filter};
    }
}, {filter: false});