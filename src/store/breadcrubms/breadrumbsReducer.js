
const initialState = [
  // {
  //  name: '',
  //  link: '',
  // },
];

const breadcrumbsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BREADCRUBMS':
      return action.payload;

    case 'CHANGE_CRUMB_NAME':
      state[action.payload.index].name = action.payload.name;
      return [...state];

    default:
      return state;
  }
};

export default breadcrumbsReducer;
