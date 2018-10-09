/*
班级完成情况相关数据 */

import {AMEND_CLASS_COMPLETION_DATA} from '../actions/index';
let initState = {
    data: 1
}
export default function (state = initState, action) {

    switch (action.type) {
        case AMEND_CLASS_COMPLETION_DATA:
            return {
                ...state,
                state:action.data
            }
            break;

        default:
            return state
            break;
    }
}