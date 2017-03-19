export const ADD_STANDUP = 'add-standup';

const INITIAL_STATE = {
  list: [],
  error: null,
  loading: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_STANDUP:
      return { ...state, list: [...state.list, action.payload] };
    default:
      return state;
  }
}
