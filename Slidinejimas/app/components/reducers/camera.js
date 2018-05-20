const initialState = {
  finished: false,
  screenshot: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_PHOTO':
      return {
        ...state,
        screenshot: action.Screenshot,
      };
  
    default:
      return state;
  }
};