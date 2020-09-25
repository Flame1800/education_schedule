import { act } from 'react-dom/test-utils';
import { handleActions } from 'redux-actions';
import * as actions from '../../actions/index';

export default handleActions({
    [actions.loadSheduleSuccess](state, {payload: { data }}) {
        data.forEach(element => {
            // console.log(element.group.course)
        });
        return data;
    }
}, {});