import { SET_BREADCRUBMS, CHANGE_CRUMB_NAME } from './actions';


const breadcrumbsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_BREADCRUBMS:
      return action.payload;

    case CHANGE_CRUMB_NAME:
      state[action.payload.index].name = action.payload.name;
      return [...state];

    default:
      return state;
  }
};

export default breadcrumbsReducer;
