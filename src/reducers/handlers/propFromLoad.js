import { handleActions } from 'redux-actions';
import * as actions from '../../actions/index';

export default handleActions({
    [actions.pushProp](state, {payload: { prop }}) {
        return prop;
    }
}, {});

