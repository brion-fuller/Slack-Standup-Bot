import { FORM_UPDATE, FORM_RESET, FORM_SUBMIT } from 'constants';
export const ADD_STANDUP = 'add-standup';

const initialState = {
  new: {},
  list: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FORM_UPDATE:
      return { ...state, new: { ...state.new, [action.name]: action.value } };
    case FORM_RESET:
      return { ...state, new: {} };
    case FORM_SUBMIT:
      return { ...state, list: [...state.list, state.new], new: {} };
    default:
      return state;
  }
}
