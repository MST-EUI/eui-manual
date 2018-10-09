import assign from 'object-assign';

import {
  GET_QUESTION_INFO,
  GET_QUESTION_METHOD,
} from '~/actions/actionTypes';

const answerCard = (state = {
  getQuestionInfoList: {},
  questionMethod: {},
}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_QUESTION_INFO:
    // console.log(payload)
      return assign({}, state, { getQuestionInfoList: payload });
    case GET_QUESTION_METHOD:
      return assign({}, state, { questionMethod: payload });
    default:
      return state;
  }
};

export default answerCard;
